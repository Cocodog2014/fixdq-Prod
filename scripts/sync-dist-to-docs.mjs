// Syncs the production build (dist/) into docs/ for GitHub Pages (branch: development, folder: /docs)
// Run after `npm run build`.

import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const docsDir = path.join(root, 'docs');
const cnameSrc = path.join(root, 'CNAME');
const cnameDst = path.join(docsDir, 'CNAME');
const nojekyll = path.join(docsDir, '.nojekyll');

function exists(p) {
  try { fs.accessSync(p); return true; } catch { return false; }
}

async function rmrf(p) {
  if (!exists(p)) return;
  await fsp.rm(p, { recursive: true, force: true });
}

async function main() {
  if (!exists(distDir)) {
    console.error('dist/ not found. Run `npm run build` first.');
    process.exit(1);
  }

  // Clean and copy
  await rmrf(docsDir);
  await fsp.mkdir(docsDir, { recursive: true });
  await fsp.cp(distDir, docsDir, { recursive: true });

  // Ensure CNAME
  if (exists(cnameSrc)) {
    await fsp.copyFile(cnameSrc, cnameDst);
  } else {
    // default for this project; adjust if needed
    await fsp.writeFile(cnameDst, 'dev.fixdq.org\n', 'utf8');
  }

  // Disable Jekyll
  await fsp.writeFile(nojekyll, '', 'utf8');

  // Small UX: create /docs/docs redirect to root to avoid accidental /docs/ visits
  const nestedDocs = path.join(docsDir, 'docs');
  await fsp.mkdir(nestedDocs, { recursive: true });
  const redirect = `<!doctype html><html><head><meta charset="utf-8"><title>Redirecting…</title><meta http-equiv="refresh" content="0; URL='/'" /></head><body><p>Redirecting…</p><script>(function(){try{window.location.replace('/') }catch(e){ window.location.href='/' }})();</script></body></html>`;
  await fsp.writeFile(path.join(nestedDocs, 'index.html'), redirect, 'utf8');

  console.log('Synced dist/ -> docs/ for GitHub Pages.');
  console.log('Next: git add -A && git commit -m "Deploy dist to docs" && git push origin development');
}

main().catch((err) => { console.error(err); process.exit(1); });
