// /api/rag-debug.js — returns top-K KB chunks for a query (no LLM)
const fsp = require('fs/promises');
const path = require('path');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const KB_INDEX = path.join(process.cwd(), 'knowledge', 'index.json');
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small';
const THRESHOLD = Number(process.env.RAG_THRESHOLD || 0.12);

function json(res, status, body) {
  res.writeHead(status, { ...CORS, 'Content-Type':'application/json' });
  res.end(JSON.stringify(body));
}
function cosineSim(a, an, b, bn) { let dot=0; for (let i=0;i<a.length;i++) dot+=a[i]*b[i]; return dot/(an*bn); }

async function embed(q) {
  const r = await fetch('https://api.openai.com/v1/embeddings', {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},
    body:JSON.stringify({ model: EMBEDDING_MODEL, input: q })
  });
  const data = await r.json();
  if (!r.ok) throw new Error(`Embeddings ${r.status}: ${JSON.stringify(data)}`);
  return data.data[0].embedding;
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return json(res, 204, {});
  if (req.method !== 'POST') return json(res, 405, { error: 'POST only' });
  try {
    const body = JSON.parse(await new Promise((resolve)=>{let b=''; req.on('data',c=>b+=c); req.on('end',()=>resolve(b||'{}'));}));
    const query = body.query || '';
    if (!query) return json(res, 400, { error: 'query required' });

    const raw = await fsp.readFile(KB_INDEX, 'utf8').catch(()=>null);
    if (!raw) return json(res, 200, { note:'no index.json found', results: [] });
    const idx = JSON.parse(raw);
    if (!idx.chunks?.length) return json(res, 200, { note:'empty index', results: [] });

    const q = await embed(query);
    const qn = Math.sqrt(q.reduce((s,v)=>s+v*v,0));
    const scored = idx.chunks
      .map(ch => ({ title: ch.title, file: ch.file, score: cosineSim(q, qn, ch.embedding, ch.norm), preview: ch.content.slice(0, 240) + '…' }))
      .sort((a,b)=>b.score-a.score)
      .slice(0, 6)
      .filter(x => x.score >= THRESHOLD)
      .map(x => ({ ...x, score: Number(x.score.toFixed(3)) }));

    return json(res, 200, { results: scored, threshold: THRESHOLD, embedding_model: EMBEDDING_MODEL });
  } catch (e) {
    return json(res, 500, { error: String(e) });
  }
};

module.exports.config = { runtime: 'nodejs20.x' };
