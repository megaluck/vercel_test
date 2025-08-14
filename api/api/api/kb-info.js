// /api/kb-info.js — inspect knowledge files and the keyword index
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const KB_DIR = path.join(process.cwd(), 'knowledge');
const KW_INDEX = path.join(process.cwd(), 'knowledge', 'keyword_index.json');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
  if (req.method !== 'GET') { res.writeHead(405, { ...CORS, 'Content-Type':'application/json' }); return res.end(JSON.stringify({ error: 'GET only' })); }

  try {
    // Files present in /knowledge
    let files = [];
    const exists = fs.existsSync(KB_DIR);
    if (exists) {
      const names = await fsp.readdir(KB_DIR);
      files = await Promise.all(names.map(async n => {
        const p = path.join(KB_DIR, n);
        const st = await fsp.stat(p).catch(() => null);
        return st ? { name: n, size: st.size, isFile: st.isFile() } : null;
      }));
      files = files.filter(Boolean);
    }

    // Index content
    let index = null;
    try {
      const raw = await fsp.readFile(KW_INDEX, 'utf8');
      const idx = JSON.parse(raw);
      index = {
        type: idx.type || 'keyword',
        docs: idx.docs || [],
        docCount: idx.docs?.length || 0,
        chunkCount: idx.chunks?.length || 0,
        N: idx.N || 0,
        avgdl: idx.avgdl || 0,
        sampleChunks: (idx.chunks || []).slice(0, 3).map(c => ({
          idx: c.idx, file: c.file, title: c.title, len: c.len, sample: (c.content || '').slice(0, 120) + '…'
        }))
      };
    } catch {}

    res.writeHead(200, { ...CORS, 'Content-Type':'application/json' });
    res.end(JSON.stringify({ kbDir: KB_DIR, files, index }));
  } catch (e) {
    res.writeHead(500, { ...CORS, 'Content-Type':'application/json' });
    res.end(JSON.stringify({ error: String(e) }));
  }
};

module.exports.config = { runtime: 'nodejs20.x' };
