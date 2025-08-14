const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const ROOT = process.cwd();
const PROMPT_FILE = path.join(ROOT, 'prompt.txt');
const KB_INDEX = path.join(ROOT, 'knowledge', 'index.json');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
  if (req.method !== 'GET') {
    res.writeHead(405, { ...CORS, 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'GET only' }));
  }
  try {
    let promptSha = null, kbStats = null;
    try {
      const txt = await fsp.readFile(PROMPT_FILE, 'utf8');
      promptSha = crypto.createHash('sha1').update(txt).digest('hex').slice(0, 12);
    } catch {}

    try {
      const raw = await fsp.readFile(KB_INDEX, 'utf8');
      const idx = JSON.parse(raw);
      kbStats = { docs: idx.docs?.length || 0, chunks: idx.chunks?.length || 0, dims: idx.dims || null, model: idx.embedding_model || null };
    } catch {}

    const payload = {
      ok: true,
      now: new Date().toISOString(),
      node: process.version,
      region: process.env.VERCEL_REGION || null,
      hasKey: Boolean(process.env.OPENAI_API_KEY),
      model: process.env.OPENAI_MODEL || 'gpt-5',
      embedding_model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
      prompt_sha1: promptSha,
      kb: kbStats
    };
    res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
  } catch (e) {
    res.writeHead(500, { ...CORS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: String(e) }));
  }
};

module.exports.config = { runtime: 'nodejs20.x' };
