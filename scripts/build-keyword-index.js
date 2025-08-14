// Build a BM25 keyword index from /knowledge/*.md|txt|pdf into /knowledge/keyword_index.json
// Run: node scripts/build-keyword-index.js
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const pdfParse = require("pdf-parse");

const ROOT = process.cwd();
const KB_DIR = path.join(ROOT, "knowledge");
const OUT = path.join(KB_DIR, "keyword_index.json");

// Tuning
const MAX_WORDS = 280;         // chunk size
const OVERLAP_WORDS = 60;      // overlap
const KEEP_TOP_TOKENS = 120;   // per-chunk tf cap (raised from 64 for jargon)
const STOP = new Set(("a,an,and,are,as,at,be,by,for,from,has,have,he,her,his,if,in,is,it,its,of,on,or,our,she,that,the,them,they,this,to,was,were,will,with,you,your,about,into,than,then,there,which,who,whom,how,what,when,where,why"
).split(","));

function normWhitespace(s){ return s.replace(/\s+/g," ").trim(); }
function tokenize(s){
  return normWhitespace(String(s).toLowerCase())
    .replace(/[`~!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|]/g," ")
    .split(/\s+/)
    .filter(t => t && !STOP.has(t) && t.length>1 && t.length<40);
}

async function* walk(dir){
  const dirents = await fsp.readdir(dir, { withFileTypes: true });
  for (const d of dirents) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(p);
    else if (/\.(md|txt|pdf)$/i.test(d.name)) yield p;
  }
}

async function readFileSmart(file){
  if (/\.pdf$/i.test(file)) {
    const data = await fsp.readFile(file);
    const parsed = await pdfParse(data).catch(e => ({ text: "" }));
    return parsed.text || "";
  }
  return await fsp.readFile(file, "utf8");
}

function chunkWords(text, max=MAX_WORDS, overlap=OVERLAP_WORDS){
  const words = normWhitespace(text).split(" ");
  const chunks = [];
  for (let i=0; i<words.length; i += (max - overlap)) {
    const piece = words.slice(i, i+max).join(" ").trim();
    if (piece) chunks.push(piece);
  }
  return chunks;
}

(async function run(){
  if (!fs.existsSync(KB_DIR)) {
    console.error("No /knowledge folder found."); process.exit(1);
  }

  const files = [];
  for await (const f of walk(KB_DIR)) {
    if (path.basename(f) === "keyword_index.json") continue;
    files.push(f);
  }

  console.log(`Found ${files.length} KB file(s):`);
  files.forEach(f => console.log(" •", path.relative(ROOT, f)));

  if (!files.length) {
    console.log("No KB files found in /knowledge"); process.exit(0);
  }

  const index = {
    type: "keyword",
    created_at: new Date().toISOString(),
    docs: [],
    chunks: [],              // { idx, file, title, content, len, tfs }
    df: {},
    N: 0,
    avgdl: 0
  };

  let globalIdx = 0;
  let totalLen = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const title = path.basename(file);
    const text = await readFileSmart(file);
    const pieces = chunkWords(text);

    console.log(`Indexing: ${rel} → ${pieces.length} chunk(s)`);
    if (pieces.length === 0) {
      console.warn(`WARN: ${rel} produced 0 chunks (file empty or too short after normalization)`);
    }

    pieces.forEach((piece, pi) => {
      const toks = tokenize(piece);
      totalLen += toks.length;

      const tf = {};
      for (const t of toks) tf[t] = (tf[t] || 0) + 1;

      const top = Object.entries(tf)
        .sort((a,b)=>b[1]-a[1])
        .slice(0, KEEP_TOP_TOKENS);

      const tfs = {};
      for (const [t,c] of top) {
        tfs[t] = c;
        index.df[t] = (index.df[t] || 0) + 1;
      }

      index.chunks.push({
        idx: globalIdx++,
        file: rel,
        title,
        content: piece,
        len: toks.length,
        tfs
      });
    });

    index.docs.push({ file: rel, title });
  }

  index.N = index.chunks.length || 1;
  index.avgdl = index.N ? totalLen / index.N : 0;

  await fsp.writeFile(OUT, JSON.stringify(index));
  console.log(`Wrote ${OUT} with ${index.N} chunk(s) from ${index.docs.length} doc(s). avgdl=${index.avgdl.toFixed(1)}`);
})().catch(e=>{ console.error(e); process.exit(1); });
