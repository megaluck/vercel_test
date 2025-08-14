// /api/ls-knowledge.js
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
  if (req.method !== 'GET') { res.writeHead(405, { ...CORS, 'Content-Type':'application/json' }); return res.end(JSON.stringify({ error:'GET only' })); }

  try {
    const root = process.cwd();
    const kbDir = path.join(root, 'knowledge');
    const exists = fs.existsSync(kbDir);
    let files = [];
    if (exists) {
      const names = await fsp.readdir(kbDir);
      files = await Promise.all(names.map(async n => {
        const p = path.join(kbDir, n);
        const st = await fsp.stat(p);
        return { name: n, size: st.size, isFile: st.isFile() };
      }));
    }
    res.writeHead(200, { ...CORS, 'Content-Type':'application/json' });
    res.end(JSON.stringify({ cwd: root, kbDir, exists, files }));
  } catch (e) {
    res.writeHead(500, { ...CORS, 'Content-Type':'application/json' });
    res.end(JSON.stringify({ error: String(e) }));
  }
};

module.exports.config = { runtime: 'nodejs20.x' };
