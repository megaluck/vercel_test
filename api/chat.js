// /api/chat.js — Chat with prompt.txt + KB + citations + strict mode + rich errors
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
const STRICT_KB = process.env.STRICT_KB_ONLY === '1';          // <— new
const THRESHOLD = Number(process.env.RAG_THRESHOLD || 0.12);    // <— tunable

function rid() {
  try { return crypto.randomUUID(); } catch { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`; }
}
function json(res, status, body, headers={}) {
  res.writeHead(status, { ...CORS, 'Content-Type':'application/json', ...headers });
  res.end(JSON.stringify(body));
}
function stackHead(err, lines=5) {
  const s = err?.stack || '';
  return s.split('\n').slice(0, lines).join('\n');
}
function errorOut(res, id, phase, err, extra = {}, status = 500) {
  json(res, status, {
    error: 'Server error',
    phase,
    message: err?.message || String(err),
    requestId: id,
    debug: { ...extra, stack_head: stackHead(err) }
  }, { 'X-Request-Id': id, 'X-Error-Phase': phase });
}

let promptCache = { text: null, sha1: null, mtimeMs: 0 };
let kbCache = { index: null, loadedAt: 0 };

async function readPrompt() {
  try {
    const stat = await fsp.stat(PROMPT_FILE);
    if (!promptCache.text || stat.mtimeMs !== promptCache.mtimeMs) {
      const text = await fsp.readFile(PROMPT_FILE, 'utf8');
      const sha1 = crypto.createHash('sha1').update(text).digest('hex').slice(0, 12);
      promptCache = { text, sha1, mtimeMs: stat.mtimeMs };
    }
  } catch {
    if (!promptCache.text) promptCache = { text: 'You are a helpful assistant.', sha1: 'noprompt', mtimeMs: 0 };
  }
  return promptCache;
}

async function readKB() {
  if (kbCache.index) return kbCache;
  try {
    const raw = await fsp.readFile(KB_INDEX, 'utf8');
    kbCache.index = JSON.parse(raw);
    kbCache.loadedAt = Date.now();
  } catch {
    kbCache.index = null;
  }
  return kbCache;
}

async function embed(input) {
  const r = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input })
  });
  const txt = await r.text();
  const data = (() => { try { return JSON.parse(txt); } catch { return null; }})();
  if (!r.ok) throw new Error(`Embeddings ${r.status}: ${txt.slice(0, 400)}`);
  const emb = data?.data?.[0]?.embedding;
  if (!emb) throw new Error('Embeddings: empty response');
  return emb;
}
function cosineSim(a, an, b, bn) { let dot = 0; for (let i=0;i<a.length;i++) dot += a[i]*b[i]; return dot/(an*bn); }

async function chat(model, messages) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model, temperature: 0.4, messages })
  });
  const txt = await r.text();
  const data = (() => { try { return JSON.parse(txt); } catch { return null; }})();
  if (!r.ok) {
    const err = new Error(`Chat ${r.status}: ${txt.slice(0, 500)}`);
    err._openaiStatus = r.status; err._openaiBody = txt.slice(0, 1200);
    throw err;
  }
  return { reply: data?.choices?.[0]?.message?.content ?? '', usage: data?.usage || null };
}

module.exports = async function handler(req, res) {
  const id = rid();
  res.setHeader('X-Request-Id', id);

  try {
    if (req.method === 'OPTIONS') return json(res, 204, {}, { 'X-Request-Id': id });
    if (req.method !== 'POST') return json(res, 405, { error: 'POST only' }, { 'X-Request-Id': id });
    if (!process.env.OPENAI_API_KEY) return json(res, 500, { error: 'Missing OPENAI_API_KEY', requestId: id });

    // parse body
    let payload = {};
    try {
      const chunks = []; for await (const c of req) chunks.push(c);
      payload = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
    } catch (e) { return errorOut(res, id, 'parse_body', e); }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const wantDebug = url.searchParams.get('debug') === '1';
    const msgs = Array.isArray(payload.messages) ? payload.messages : [];
    const userMsg = [...msgs].reverse().find(m => m.role === 'user')?.content || '';
    if (!userMsg) return json(res, 400, { error: 'messages[] required', requestId: id });

    // prompt + KB
    let prompt; let kb;
    try { prompt = await readPrompt(); } catch (e) { return errorOut(res, id, 'read_prompt', e); }
    try { kb = await readKB(); } catch (e) { kb = { index: null }; }

    // retrieval
    let retrieved = [];
    let sources = [];
    if (kb.index?.chunks?.length) {
      try {
        const q = await embed(userMsg);
        const qn = Math.sqrt(q.reduce((s,v)=>s+v*v,0));
        retrieved = kb.index.chunks
          .map(ch => ({ ...ch, score: cosineSim(q, qn, ch.embedding, ch.norm) }))
          .sort((a,b) => b.score - a.score)
          .slice(0, 6)
          .filter(x => x.score >= THRESHOLD);
        sources = retrieved.map(r => ({ title: r.title, file: r.file, score: Number(r.score.toFixed(3)) }));
      } catch (e) {
        return errorOut(res, id, 'embed', e, { embedding_model: EMBEDDING_MODEL }, 502);
      }
    }

    // Strict mode: if nothing retrieved, do not ask the model
    if (STRICT_KB && sources.length === 0) {
      return json(res, 200, {
        reply: "I don’t have this in my sources yet. Try rephrasing or check the official docs.",
        sources,
        debug: wantDebug ? {
          requestId: id,
          strict_kb: true,
          model: CHAT_MODEL,
          prompt_sha1: prompt.sha1,
          kb_total_chunks: kb.index?.chunks?.length || 0,
          embedding_model: EMBEDDING_MODEL
        } : undefined
      }, { 'X-Request-Id': id });
    }

    // Build the context and strong instruction to cite
    const context = sources.length
      ? retrieved.map((r,i) => `[${i+1}] ${r.title} (${r.file})\n${r.content}`).join('\n\n---\n\n')
      : '(no relevant excerpts found)';

    const systemMsg = [
      prompt.text,
      '',
      'IMPORTANT:',
      '- Answer ONLY using the provided excerpts.',
      '- If the excerpts are insufficient, reply exactly: "I don’t have this in my sources."',
      '- When you answer, include a final line "Sources: [1], [2], ..." using the bracket numbers above.'
    ].join('\n');

    const messages = [
      { role: 'system', content: systemMsg },
      { role: 'user', content: `User question:\n${userMsg}\n\nExcerpts:\n${context}\n` }
    ];

    // LLM call
    let reply, usage;
    try {
      const out = await chat(CHAT_MODEL, messages);
      reply = out.reply; usage = out.usage;
    } catch (e) {
      return errorOut(res, id, 'openai_chat', e, {
        model: CHAT_MODEL,
        openai_status: e?._openaiStatus || null,
        openai_body: e?._openaiBody || null
      }, 502);
    }

    return json(res, 200, {
      reply,
      sources,   // <— client can render these as chips
      debug: wantDebug ? {
        requestId: id,
        model: CHAT_MODEL,
        prompt_sha1: prompt.sha1,
        kb_chunks_considered: sources.length,
        kb_total_chunks: kb.index?.chunks?.length || 0,
        embedding_model: EMBEDDING_MODEL,
        threshold: THRESHOLD,
        strict_kb: STRICT_KB,
        usage
      } : undefined
    }, { 'X-Request-Id': id });
  } catch (e) {
    return errorOut(res, id, 'fatal', e);
  }
};

module.exports.config = { runtime: 'nodejs20.x' };
