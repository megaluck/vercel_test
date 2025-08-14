// Serverless Chat Endpoint (no dependencies)
// CJS syntax to avoid ESM pitfalls on Node runtimes.
const { randomUUID } = require('crypto');
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Cheap, safe logger (opt-in with DEBUG_LOGGING=1)
function makeLogger(rid) {
  return (...args) => {
    if (process.env.DEBUG_LOGGING === '1') {
      console.log(`[chat ${rid}]`, ...args);
    }
  };
}

function sanitizeMessages(arr) {
  if (!Array.isArray(arr)) return [];
  // Keep last 12, clamp content length to 1500 chars each
  return arr
    .filter(m => m && typeof m.content === 'string' && m.role)
    .slice(-12)
    .map(m => ({ role: m.role, content: m.content.slice(0, 1500) }));
}

module.exports = async function handler(req, res) {
  const rid = (randomUUID && randomUUID()) || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  const log = makeLogger(rid);
  res.setHeader('X-Request-Id', rid);

  try {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, cors); return res.end();
    }
    if (req.method !== 'POST') {
      res.writeHead(405, { ...cors, 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'POST only' }));
    }

    const hasKey = Boolean(process.env.OPENAI_API_KEY);
    if (!hasKey) {
      res.writeHead(500, { ...cors, 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing OPENAI_API_KEY' }));
    }

    // Parse query string for debug flag
    const url = new URL(req.url, `http://${req.headers.host}`);
    const wantDebug = url.searchParams.get('debug') === '1';

    // Robust body parse
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8') || '{}';
    let payload = {};
    try { payload = JSON.parse(raw); } catch (e) { /* ignore */ }

    const userMessages = sanitizeMessages(payload.messages || []);
    if (!userMessages.length) {
      res.writeHead(400, { ...cors, 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'messages[] required' }));
    }

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const requestBody = {
      model,
      temperature: 0.6,
      messages: userMessages,
    };

    log('Calling OpenAI', { model, nMsgs: userMessages.length });

    const t0 = Date.now();
    const oaRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });
    const t1 = Date.now();

    const data = await oaRes.json().catch(() => ({}));

    if (!oaRes.ok) {
      log('OpenAI error', { status: oaRes.status, data });
      res.writeHead(502, { ...cors, 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        error: 'OpenAI error',
        details: wantDebug ? data : undefined,
        debug: wantDebug ? {
          requestId: rid,
          model,
          openaiStatus: oaRes.status,
          latencyMs: t1 - t0,
          region: process.env.VERCEL_REGION || null,
        } : undefined
      }));
    }

    const reply = data?.choices?.[0]?.message?.content ?? 'Sorry, I couldn’t answer that.';
    const usage = data?.usage || null;

    const response = {
      reply,
      debug: wantDebug ? {
        requestId: rid,
        model,
        openaiStatus: oaRes.status,
        latencyMs: t1 - t0,
        usage,
        region: process.env.VERCEL_REGION || null,
        hasKey: hasKey
      } : undefined
    };

    res.writeHead(200, { ...cors, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  } catch (e) {
    console.error(`[chat ${rid}]`, e);
    res.writeHead(500, { ...cors, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Server error',
      message: String(e),
      debug: { requestId: rid, region: process.env.VERCEL_REGION || null }
    }));
  }
};
