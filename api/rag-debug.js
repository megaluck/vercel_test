// RAG debug: returns top-K keyword/BM25 matches (no LLM)
const fsp = require('fs/promises');
const path = require('path');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
const KW_INDEX = path.join(process.cwd(), 'knowledge', 'keyword_index.json');

const K1 = Number(process.env.BM25_K1 || 1.2);
const B  = Number(process.env.BM25_B  || 0.75);
const THRESHOLD = Number(process.env.RAG_THRESHOLD || 0.08);

function json(res, status, body){
  res.writeHead(status, { ...CORS, 'Content-Type':'application/json' });
  res.end(JSON.stringify(body));
}
function normWhitespace(s){ return s.replace(/\s+/g," ").trim(); }
const STOP = new Set(("a,an,and,are,as,at,be,by,for,from,has,have,he,her,his,if,in,is,it,its,of,on,or,our,she,that,the,them,they,this,to,was,were,will,with,you,your,about,into,than,then,there,which,who,whom,how,what,when,where,why"
).split(","));
function tokenize(s){
  return normWhitespace(String(s).toLowerCase())
    .replace(/[`~!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|]/g," ")
    .split(/\s+/)
    .filter(t => t && !STOP.has(t) && t.length>1 && t.length<40);
}
function idf(term, N, df){
  const n = df[term] || 0;
  return Math.log((N - n + 0.5) / (n + 0.5) + 1);
}
function bm25Score(qtoks, ch, df, N, avgdl){
  let score = 0, dl = ch.len || 1;
  for (const t of qtoks) {
    const tf = (ch.tfs && ch.tfs[t]) || 0; if (!tf) continue;
    const _idf = idf(t, N, df);
    const denom = tf + K1 * (1 - B + B * (dl / (avgdl || 1)));
    score += _idf * ((tf * (K1 + 1)) / denom);
  }
  return score;
}

module.exports = async function handler(req, res){
  if (req.method === 'OPTIONS') return json(res, 204, {});
  if (req.method !== 'POST') return json(res, 405, { error:'POST only' });
  try {
    const raw = await new Promise(resolve => { let b=""; req.on('data',c=>b+=c); req.on('end',()=>resolve(b||'{}')); });
    const body = JSON.parse(raw);
    const query = body.query || "";
    if (!query) return json(res, 400, { error:'query required' });

    const rawIdx = await fsp.readFile(KW_INDEX, 'utf8').catch(()=>null);
    if (!rawIdx) return json(res, 200, { note:'no keyword_index.json found', results: [] });

    const idx = JSON.parse(rawIdx);
    const qtoks = tokenize(query);
    const scored = idx.chunks.map(ch => ({
      title: ch.title, file: ch.file,
      score: bm25Score(qtoks, ch, idx.df||{}, idx.N||idx.chunks.length, idx.avgdl||1),
      preview: (ch.content || "").slice(0, 240) + "…"
    })).filter(r => Number.isFinite(r.score))
      .sort((a,b)=>b.score-a.score)
      .slice(0, 6)
      .filter(x => x.score >= THRESHOLD)
      .map(x => ({ ...x, score: Number(x.score.toFixed(3)) }));

    return json(res, 200, { retriever:"bm25", results: scored, threshold: THRESHOLD, k1: K1, b: B, N: idx.N, avgdl: idx.avgdl });
  } catch (e) {
    return json(res, 500, { error: String(e) });
  }
};

module.exports.config = { runtime: 'nodejs20.x' };
