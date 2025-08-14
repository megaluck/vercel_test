// /api/chat.js — serverless chat with prompt.txt + file-based RAG (no SDK)
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
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small'; // 1536 dims

let promptCache = { text: null, sha1: null, mtimeMs: 0 };
let kbCache = { index: null, loadedAt: 0 };

// --------- utils ---------
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

function cosineSim(a, an, b, bn) {
  // a·b / (||a|| * ||b||) ; we already store norms
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot / (an * bn);
}

// --------- OpenAI calls ---------
async function embed(input) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Embeddings ${res.status}: ${JSON.stringify(data)}`);
  return data.data[0].embedding;
}

async function chat(model, messages) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model, temperature: 0.5, messages })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Chat ${res.status}: ${JSON.stringify(data)}`);
  return { reply: data?.choices?.[0]?.message?.content ?? '', usage: data?.usage || null };
}

// --------- handler ---------
module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
  if (req.method !== 'POST') {
    res.writeHead(405, { ...CORS, 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'POST only' }));
  }
  if (!process.env.OPENAI_API_KEY) {
    res.writeHead(500, { ...CORS, 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Missing OPENAI_API_KEY' }));
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const wantDebug = url.searchParams.get('debug') === '1';
  const model = process.env.OPENAI_MODEL || 'gpt-5'; // set to GPT-5 by default if your account has access

  const chunks = [];
  for await (const c of req) chunks.push(c);
  let payload = {};
  try { payload = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch {}
  const msgs = Array.isArray(payload.messages) ? payload.messages : [];
  const user = [...msgs].reverse().find(m => m.role === 'user')?.content || '';

  const t0 = Date.now();
  try {
    const [{ text: systemPrompt, sha1 }, kb] = await Promise.all([readPrompt(), readKB()]);

    // Retrieve top-K from KB (if available)
    let retrieved = [];
    if (kb.index && kb.index.chunks?.length) {
      const qVec = await embed(user);
      const qNorm = Math.sqrt(qVec.reduce((s, v) => s + v * v, 0));
      const scored = kb.index.chunks.map(ch => ({
        ...ch,
        score: cosineSim(qVec, qNorm, ch.embedding, ch.norm)
      }));
      scored.sort((a, b) => b.score - a.score);
      retrieved = scored.slice(0, 6).filter(x => x.score > 0.2); // simple threshold
    }

    const context = retrieved.map(r =>
      `Source: ${r.title} (${r.file})\n${r.content}`
    ).join('\n\n---\n\n');

    const messages = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content:
`User question:
${user}

Relevant knowledge base excerpts:
${context || '(no relevant excerpts found)'}
`
      }
    ];

    const { reply, usage } = await chat(model, messages);

    res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      reply,
      debug: wantDebug ? {
        model,
        prompt_sha1: sha1,
        kb_chunks_considered: retrieved.length,
        kb_total_chunks: kb.index?.chunks?.length || 0,
        latency_ms: Date.now() - t0,
        usage
      } : undefined
    }));
  } catch (e) {
    res.writeHead(500, { ...CORS, 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Server error', message: String(e) }));
  }
};

// Pin Node runtime (function-level)
module.exports.config = { runtime: 'nodejs20.x' };
