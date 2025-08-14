// /api/health.js — quick probe for runtime, region, key presence
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
    if (req.method !== 'GET') {
      res.writeHead(405, { ...CORS, 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'GET only' }));
    }
    const payload = {
      ok: true,
      now: new Date().toISOString(),
      nodeVersion: process.version,
      region: process.env.VERCEL_REGION || null,
      hasKey: Boolean(process.env.OPENAI_API_KEY),
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini'
    };
    res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
  } catch (e) {
    res.writeHead(500, { ...CORS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: String(e) }));
  }
};

// Pin Node.js runtime here too
module.exports.config = { runtime: 'nodejs20.x' };
