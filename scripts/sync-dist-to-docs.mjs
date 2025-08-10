<<<<<<< HEAD
// Syncs the production build (dist/) into docs/ for GitHub Pages (branch: development, folder: /docs)
// Run after `npm run build`.

import fs from 'fs';
import fsp from 'fs/promises';
=======
// Sync dist/ -> docs/ for GitHub Pages (development/docs)
// - Mirrors built assets
// - Ensures CNAME and .nojekyll
// - Adds docs/docs redirect to /

import { promises as fs } from 'fs';
>>>>>>> dev-1
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const docsDir = path.join(root, 'docs');
<<<<<<< HEAD
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
=======

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function rmrf(dir) {
  if (!(await exists(dir))) return;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  await Promise.all(entries.map(async (e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await rmrf(full);
    } else {
      await fs.unlink(full);
    }
  }));
  await fs.rmdir(dir).catch(() => {});
}

async function copyDir(src, dest) {
  if (!(await exists(dest))) await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) {
      await copyDir(s, d);
    } else {
      await fs.copyFile(s, d);
    }
  }
}

async function ensureFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content);
}

async function main() {
  if (!(await exists(distDir))) {
    console.error('dist/ not found. Run "npm run build" first or use "npm run deploy".');
    process.exit(1);
  }

  // Mirror dist -> docs (clean first for accurate mirror)
  if (await exists(docsDir)) {
    await rmrf(docsDir);
  }
  await copyDir(distDir, docsDir);

  // Ensure CNAME and .nojekyll in docs root
  const cnameSrc = path.join(root, 'CNAME');
  const cnameDest = path.join(docsDir, 'CNAME');
  if (await exists(cnameSrc)) {
    const cname = await fs.readFile(cnameSrc, 'utf8');
    await ensureFile(cnameDest, cname.trim() + '\n');
  } else {
    // Fallback: write known dev domain if CNAME missing
    await ensureFile(cnameDest, 'dev.fixdq.org\n');
  }
  await ensureFile(path.join(docsDir, '.nojekyll'), '');

  // Redirect /docs/ -> /
  const redirectHtml = `<!doctype html><meta http-equiv="refresh" content="0; url=/"><link rel="canonical" href="/" />`;
  const nestedDocsDir = path.join(docsDir, 'docs');
  await fs.mkdir(nestedDocsDir, { recursive: true });
  await ensureFile(path.join(nestedDocsDir, 'index.html'), redirectHtml);

  console.log('Synced dist -> docs with CNAME, .nojekyll, and /docs redirect.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
>>>>>>> dev-1
