// Chat API: BM25 keyword retrieval (no embeddings) + prompt.txt + citations + optional LLM fallback + rich errors
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
const KW_INDEX = path.join(ROOT, 'knowledge', 'keyword_index.json');

const CHAT_MODEL   = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const STRICT_KB    = process.env.STRICT_KB_ONLY === '1';         // if true: never freestyle
const ALLOW_FALLBACK = process.env.ALLOW_FALLBACK !== '0';        // default ON (behave like normal LLM if no KB)
const THRESHOLD    = Number(process.env.RAG_THRESHOLD || 0.08);
const K1           = Number(process.env.BM25_K1 || 1.2);
const B            = Number(process.env.BM25_B  || 0.75);

function rid(){ try { return crypto.randomUUID(); } catch { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`; } }
function json(res, status, body, headers={}){ res.writeHead(status, { ...CORS, 'Content-Type':'application/json', ...headers }); res.end(JSON.stringify(body)); }
function stackHead(err, lines=5){ const s = err?.stack || ''; return s.split('\n').slice(0, lines).join('\n'); }
function errorOut(res, id, phase, err, extra={}, status=500){
  json(res, status, { error:'Server error', phase, message: err?.message||String(err), requestId:id, debug:{...extra, stack_head: stackHead(err)}},
    { 'X-Request-Id': id, 'X-Error-Phase': phase });
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

let promptCache = { text:null, sha1:null, mtimeMs:0 };
let kwCache = null;

async function readPrompt(){
  try {
    const st = await fsp.stat(PROMPT_FILE);
    if (!promptCache.text || st.mtimeMs !== promptCache.mtimeMs) {
      const text = await fsp.readFile(PROMPT_FILE, 'utf8');
      const sha1 = crypto.createHash('sha1').update(text).digest('hex').slice(0,12);
      promptCache = { text, sha1, mtimeMs: st.mtimeMs };
    }
  } catch {
    if (!promptCache.text) promptCache = { text: 'You are a helpful assistant.', sha1: 'noprompt', mtimeMs: 0 };
  }
  return promptCache;
}
async function readKeywordIndex(){
  if (kwCache) return kwCache;
  try {
    const raw = await fsp.readFile(KW_INDEX, 'utf8');
    kwCache = JSON.parse(raw);
  } catch {
    kwCache = null;
  }
  return kwCache;
}

function idf(term, N, df){
  const n = df[term] || 0;
  return Math.log((N - n + 0.5) / (n + 0.5) + 1);
}
function bm25Score(queryTokens, chunk, df, N, avgdl){
  let score = 0;
  const dl = chunk.len || 1;
  for (const t of queryTokens) {
    const tf = (chunk.tfs && chunk.tfs[t]) || 0;
    if (!tf) continue;
    const _idf = idf(t, N, df);
    const denom = tf + K1 * (1 - B + B * (dl / (avgdl || 1)));
    score += _idf * ((tf * (K1 + 1)) / denom);
  }
  return score;
}

async function openaiChat(model, messages){
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,
      ...(process.env.OPENAI_PROJECT ? {'OpenAI-Project': process.env.OPENAI_PROJECT} : {}),
      ...(process.env.OPENAI_ORG ? {'OpenAI-Organization': process.env.OPENAI_ORG} : {})
    },
    body: JSON.stringify({ model, temperature: 0.4, messages })
  });
  const txt = await r.text();
  let data; try { data = JSON.parse(txt); } catch { data = null; }
  if (!r.ok) {
    const err = new Error(`Chat ${r.status}: ${txt.slice(0, 700)}`);
    err._openaiStatus = r.status; err._openaiBody = txt.slice(0, 1200);
    throw err;
  }
  return { reply: data?.choices?.[0]?.message?.content ?? '', usage: data?.usage || null };
}

module.exports = async function handler(req, res){
  const id = rid();
  res.setHeader('X-Request-Id', id);

  try {
    if (req.method === 'OPTIONS') return json(res, 204, {}, { 'X-Request-Id': id });
    if (req.method !== 'POST')  return json(res, 405, { error:'POST only' }, { 'X-Request-Id': id });
    if (!process.env.OPENAI_API_KEY) return json(res, 500, { error:'Missing OPENAI_API_KEY', requestId:id });

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
    if (!userMsg) return json(res, 400, { error:'messages[] required', requestId:id });

    const [{ text: sysPrompt, sha1 }, kw] = await Promise.all([readPrompt(), readKeywordIndex()]);

    // If no index present at all
    if (!kw || !kw.chunks?.length) {
      if (STRICT_KB) return json(res, 200, { reply: "I don’t have this in my sources yet.", sources: [] });
      // Freestyle (no KB available)
      const { reply, usage } = await openaiChat(CHAT_MODEL, [
        { role:'system', content: sysPrompt },
        { role:'user', content: userMsg }
      ]);
      return json(res, 200, { reply, sources: [], debug: wantDebug ? { requestId:id, model:CHAT_MODEL, prompt_sha1: sha1, retriever:'none', mode:'fallback', usage } : undefined });
    }

    // BM25 retrieval
    const qTokens = tokenize(userMsg);
    const scored = kw.chunks.map(ch => ({
      ch,
      score: bm25Score(qTokens, ch, kw.df || {}, kw.N || kw.chunks.length, kw.avgdl || 1)
    })).filter(r => Number.isFinite(r.score));

    scored.sort((a,b)=>b.score-a.score);
    const top = scored.slice(0, 6).filter(r => r.score >= THRESHOLD);
    const sources = top.map((r,i)=>({ title: r.ch.title, file: r.ch.file, score: Number(r.score.toFixed(3)) }));

    // If nothing matched: either refuse (strict) or freestyle (fallback)
    if (sources.length === 0) {
      if (STRICT_KB) {
        return json(res, 200, {
          reply: "I don’t have this in my sources.",
          sources: [],
          debug: wantDebug ? { requestId:id, model:CHAT_MODEL, prompt_sha1:sha1, retriever:"bm25", threshold:THRESHOLD, k1:K1, b:B, mode:'strict_no_kb' } : undefined
        });
      }
      if (ALLOW_FALLBACK) {
        const { reply, usage } = await openaiChat(CHAT_MODEL, [
          { role:'system', content: sysPrompt + "\n\nIf no internal sources are provided, you may answer from general knowledge. Be concise and avoid fabricating specifics." },
          { role:'user', content: userMsg }
        ]);
        return json(res, 200, {
          reply,
          sources: [],
          debug: wantDebug ? { requestId:id, model:CHAT_MODEL, prompt_sha1:sha1, retriever:"bm25", threshold:THRESHOLD, k1:K1, b:B, mode:'fallback', usage } : undefined
        });
      }
      // If fallback is disabled explicitly
      return json(res, 200, {
        reply: "I don’t have this in my sources.",
        sources: [],
        debug: wantDebug ? { requestId:id, model:CHAT_MODEL, prompt_sha1:sha1, retriever:"bm25", threshold:THRESHOLD, k1:K1, b:B, mode:'no_fallback' } : undefined
      });
    }

    // We have sources → build grounded prompt
    const excerpts = top.map((r,i)=>`[${i+1}] ${r.ch.title} (${r.ch.file})\n${r.ch.content}`).join("\n\n---\n\n");
    const systemMsg = [
      sysPrompt, '',
      'IMPORTANT:',
      '- Answer ONLY using the provided excerpts.',
      '- If the excerpts are insufficient, reply exactly: "I don’t have this in my sources."',
      '- When you answer, include a final line "Sources: [1], [2], ..." using the bracket numbers above.'
    ].join('\n');

    let reply, usage;
    try {
      const out = await openaiChat(CHAT_MODEL, [
        { role:'system', content: systemMsg },
        { role:'user', content: `User question:\n${userMsg}\n\nExcerpts:\n${excerpts}\n` }
      ]);
      reply = out.reply; usage = out.usage;
    } catch (e) {
      return errorOut(res, id, 'openai_chat', e, { model: CHAT_MODEL, openai_status: e?._openaiStatus||null, openai_body: e?._openaiBody||null }, 502);
    }

    return json(res, 200, {
      reply,
      sources,
      debug: wantDebug ? {
        requestId: id, model: CHAT_MODEL, prompt_sha1: sha1,
        retriever: "bm25", threshold: THRESHOLD, k1: K1, b: B, mode:'grounded', usage
      } : undefined
    }, { 'X-Request-Id': id });
  } catch (e) {
    return errorOut(res, id, 'fatal', e);
  }
};

module.exports.config = { runtime: 'nodejs20.x' };
