const fsp = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const PROMPT_FILE = path.join(process.cwd(), 'prompt.txt');
const KW_INDEX = path.join(process.cwd(), 'knowledge', 'keyword_index.json');

module.exports = async function handler(req, res){
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
  if (req.method !== 'GET') { res.writeHead(405, { ...CORS, 'Content-Type':'application/json' }); return res.end(JSON.stringify({ error:'GET only' })); }
  try {
    let promptSha = null;
    try {
      const txt = await fsp.readFile(PROMPT_FILE, 'utf8');
      promptSha = crypto.createHash('sha1').update(txt).digest('hex').slice(0, 12);
    } catch {}

    let kw = null;
    try {
      const raw = await fsp.readFile(KW_INDEX, 'utf8');
      const idx = JSON.parse(raw);
      kw = { type: idx.type || 'keyword', docs: idx.docs?.length||0, chunks: idx.chunks?.length||0, N: idx.N||0, avgdl: idx.avgdl||0 };
    } catch {}

    const payload = {
      ok: true,
      now: new Date().toISOString(),
      node: process.version,
      region: process.env.VERCEL_REGION || null,
      hasKey: Boolean(process.env.OPENAI_API_KEY),
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      retriever: 'bm25',
      prompt_sha1: promptSha,
      kb_kw: kw
    };

    res.writeHead(200, { ...CORS, 'Content-Type':'application/json' });
    res.end(JSON.stringify(payload));
  } catch (e) {
    res.writeHead(500, { ...CORS, 'Content-Type':'application/json' });
    res.end(JSON.stringify({ ok:false, error:String(e) }));
  }
};

module.exports.config = { runtime: 'nodejs20.x' };
