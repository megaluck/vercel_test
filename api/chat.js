// /api/chat.js — Node.js Serverless Function (no SDK)
// Runtime pinned per-function to avoid legacy parser issues.
const { randomUUID } = require('crypto');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

function rid() {
  try { return randomUUID(); } catch { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`; }
}
function sanitizeMessages(arr) {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter(m => m && typeof m.content === 'string' && m.role)
    .slice(-12)
    .map(m => ({ role: m.role, content: m.content.slice(0, 1500) }));
}

module.exports = async function handler(req, res) {
  const id = rid();
  res.setHeader('X-Request-Id', id);

  try {
    // CORS / methods
    if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
    if (req.method !== 'POST') {
      res.writeHead(405, { ...CORS, 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'POST only' }));
    }

    if (!process.env.OPENAI_API_KEY) {
      res.writeHead(500, { ...CORS, 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing OPENAI_API_KEY' }));
    }

    // Parse query (?debug=1)
    const url = new URL(req.url, `http://${req.headers.host}`);
    const wantDebug = url.searchParams.get('debug') === '1';

    // Parse body
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    let payload = {};
    try { payload = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch {}

    const userMessages = sanitizeMessages(payload.messages);
    if (!userMessages.length) {
      res.writeHead(400, { ...CORS, 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'messages[] required' }));
    }

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const requestBody = { model, temperature: 0.6, messages: userMessages };

    const t0 = Date.now();
    const oaRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });
    const t1 = Date.now();

    let data = {};
    try { data = await oaRes.json(); } catch {}

    if (!oaRes.ok) {
      res.writeHead(502, { ...CORS, 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        error: 'OpenAI error',
        details: wantDebug ? data : undefined,
        debug: wantDebug ? {
          requestId: id,
          model,
          openaiStatus: oaRes.status,
          latencyMs: t1 - t0,
          region: process.env.VERCEL_REGION || null
        } : undefined
      }));
    }

    const reply = data?.choices?.[0]?.message?.content ?? 'Sorry, I couldn’t answer that.';
    res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      reply,
      debug: wantDebug ? {
        requestId: id,
        model,
        openaiStatus: oaRes.status,
        latencyMs: t1 - t0,
        usage: data?.usage || null,
        region: process.env.VERCEL_REGION || null,
        hasKey: true
      } : undefined
    }));
  } catch (e) {
    res.writeHead(500, { ...CORS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Server error',
      message: String(e),
      debug: { requestId: id, region: process.env.VERCEL_REGION || null }
    }));
  }
};

// Tell Vercel to use the **Node.js runtime v20** for THIS function
module.exports.config = { runtime: 'nodejs20.x' };
