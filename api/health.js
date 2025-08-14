// Lightweight health probe for quick debugging from the client.
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }
    if (req.method !== 'GET') {
      res.writeHead(405, { ...cors, 'Content-Type': 'application/json' });
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

    res.writeHead(200, { ...cors, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
  } catch (e) {
    res.writeHead(500, { ...cors, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: String(e) }));
  }
};
