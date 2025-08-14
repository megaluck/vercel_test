// /api/chat.js — Serverless chat with prompt.txt + KB + rich error diagnostics
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const ROOT = process.cwd();
const PROMPT_FILE = path.join(ROOT, 'prompt.txt');
const KB_INDEX = path.join(ROOT, 'knowledge', 'index.json');

const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small';
const CHAT_MODEL = process.env.OPENAI_MODEL || 'gpt-5';

function rid() {
  try { return crypto.randomUUID(); } catch { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`; }
}
function logEnabled() { return process.env.DEBUG_LOGGING === '1'; }
function slog(id, phase, obj) { if (logEnabled()) console.log(`[chat ${id}] ${phase}`, obj); }

function json(res, status, body, headers={}) {
  res.writeHead(status, { ...CORS, 'Content-Type':'application/json', ...headers });
  res.end(JSON.stringify(body));
}
function truncate(str, n=1000) {
  if (!str) return '';
  if (typeof str !== 'string') str = String(str);
  return str.length > n ? str.slice(0, n) + '…' : str;
}
function stackHead(err, lines=5) {
  const s = err?.stack || '';
  return s.split('\n').slice(0, lines).join('\n');
}
function errorOut(res, id, phase, err, extra = {}, status = 500) {
  const body = {
    error: 'Server error',
    phase,
    message: err?.message || String(err),
    requestId: id,
    debug: {
      ...extra,
      stack_head: stackHead(err)
    }
  };
  json(res, status, body, { 'X-Request-Id': id, 'X-Error-Phase': phase });
}

let promptCache = { text: null, sha1: null, mtimeMs: 0 };
let kbCache = { index: null, loadedAt: 0 };

async function readPrompt(id) {
  try {
    const stat = await fsp.stat(PROMPT_FILE);
    if (!promptCache.text || stat.mtimeMs !== promptCache.mtimeMs) {
      const text = await fsp.readFile(PROMPT_FILE, 'utf8');
      const sha1 = crypto.createHash('sha1').update(text).digest('hex').slice(0, 12);
      promptCache = { text, sha1, mtimeMs: stat.mtimeMs };
      slog(id, 'readPrompt', { sha1 });
    }
  } catch (e) {
    if (!promptCache.text) {
      promptCache = { text: 'You are a helpful assistant.', sha1: 'noprompt', mtimeMs: 0 };
      slog(id, 'readPrompt', { fallback: true });
    }
  }
  return promptCache;
}

async function readKB(id) {
  if (kbCache.index) return kbCache;
  try {
    const raw = await fsp.readFile(KB_INDEX, 'utf8');
    kbCache.index = JSON.parse(raw);
    kbCache.loadedAt = Date.now();
    slog(id, 'readKB', { docs: kbCache.index?.docs?.length || 0, chunks: kbCache.index?.chunks?.length || 0, dims: kbCache.index?.dims });
  } catch (e) {
    slog(id, 'readKB', { note: 'no index.json found; proceeding without KB' });
    kbCache.index = null;
  }
  return kbCache;
}

async function embed(id, input) {
  const t0 = Date.now();
  const r = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input })
  });
  const txt = await r.text();
  let data;
  try { data = JSON.parse(txt); } catch { data = null; }
  if (!r.ok) {
    slog(id, 'embed_error', { status: r.status, body: truncate(txt, 800) });
    throw new Error(`Embeddings ${r.status}: ${truncate(txt, 300)}`);
  }
  const emb = data?.data?.[0]?.embedding;
  if (!emb) throw new Error('Embeddings: empty response');
  const ms = Date.now() - t0;
  slog(id, 'embed_ok', { ms });
  return emb;
}

async function chat(id, model, messages) {
  const t0 = Date.now();
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model, temperature: 0.5, messages })
  });
  const txt = await r.text();
  let data;
  try { data = JSON.parse(txt); } catch { data = null; }
  if (!r.ok) {
    slog(id, 'chat_error', { status: r.status, body: truncate(txt, 800) });
    const err = new Error(`Chat ${r.status}: ${truncate(txt, 400)}`);
    err._openaiStatus = r.status;
    err._openaiBody = truncate(txt, 800);
    throw err;
  }
  const ms = Date.now() - t0;
  slog(id, 'chat_ok', { ms });
  return { reply: data?.choices?.[0]?.message?.content ?? '', usage: data?.usage || null };
}

function cosineSim(a, an, b, bn) {
  let dot = 0; for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot / (an * bn);
}

module.exports = async function handler(req, res) {
  const id = rid();
  res.setHeader('X-Request-Id', id);

  try {
    if (req.method === 'OPTIONS') return json(res, 204, {}, { 'X-Request-Id': id });
    if (req.method !== 'POST') return json(res, 405, { error: 'POST only' }, { 'X-Request-Id': id });

    if (!process.env.OPENAI_API_KEY) {
      return json(res, 500, { error: 'Missing OPENAI_API_KEY', requestId: id });
    }

    // parse body
    let payload = {};
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      payload = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
    } catch (e) {
      return errorOut(res, id, 'parse_body', e);
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const wantDebug = url.searchParams.get('debug') === '1';
    const userMsg = Array.isArray(payload.messages) ? [...payload.messages].reverse().find(m => m.role === 'user')?.content || '' : '';
    if (!userMsg) return json(res, 400, { error: 'messages[] required', requestId: id });

    // load prompt + KB
    let prompt, kb;
    try {
      prompt = await readPrompt(id);
    } catch (e) {
      return errorOut(res, id, 'read_prompt', e, { model: CHAT_MODEL });
    }
    try {
      kb = await readKB(id);
    } catch (e) {
      // not fatal
      slog(id, 'read_kb_warn', { message: e?.message });
      kb = { index: null };
    }

    // retrieval
    let retrieved = [];
    if (kb.index && kb.index.chunks?.length) {
      try {
        const q = await embed(id, userMsg);
        const qn = Math.sqrt(q.reduce((s, v) => s + v * v, 0));
        retrieved = kb.index.chunks
          .map(ch => ({ ...ch, score: cosineSim(q, qn, ch.embedding, ch.norm) }))
          .sort((a,b) => b.score - a.score)
          .slice(0, 6)
          .filter(x => x.score > 0.2);
      } catch (e) {
        return errorOut(res, id, 'embed', e, { embedding_model: EMBEDDING_MODEL });
      }
    }

    const context = retrieved.map(r => `Source: ${r.title} (${r.file})\n${r.content}`).join('\n\n---\n\n');
    const messages = [
      { role: 'system', content: prompt.text },
      { role: 'user', content: `User question:\n${userMsg}\n\nRelevant knowledge base excerpts:\n${context || '(no relevant excerpts found)'}\n` }
    ];

    // LLM call
    let reply, usage;
    try {
      const out = await chat(id, CHAT_MODEL, messages);
      reply = out.reply; usage = out.usage;
    } catch (e) {
      return errorOut(res, id, 'openai_chat', e, {
        model: CHAT_MODEL,
        openai_status: e?._openaiStatus || null,
        openai_body: e?._openaiBody || null
      }, 502);
    }

    // ok
    const resp = {
      reply,
      debug: wantDebug ? {
        requestId: id,
        model: CHAT_MODEL,
        prompt_sha1: prompt.sha1,
        kb_chunks_considered: retrieved.length,
        kb_total_chunks: kb.index?.chunks?.length || 0,
        embedding_model: EMBEDDING_MODEL,
        usage
      } : undefined
    };
    return json(res, 200, resp, { 'X-Request-Id': id });
  } catch (e) {
    // last-resort
    console.error(`[chat ${id}] fatal`, e);
    return errorOut(res, id, 'fatal', e);
  }
};

module.exports.config = { runtime: 'nodejs20.x' };
