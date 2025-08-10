# FixDQ Deployment Guide (development → dev.fixdq.org)

This project uses Vite + React. Local dev uses `/src/main.jsx` via Vite. Production must serve the bundled files from `dist/`.

We publish to GitHub Pages from the `development` branch, folder `/docs`. The custom domain is `dev.fixdq.org` (CNAME).

---

## 0) Quick local workflow (no build needed)
- Start the dev server (hot reload):

```powershell
npm run dev
```

- Edit files under `src/` and refresh happens automatically. You only need `npm run build` when you want to deploy or test the production bundle.

Optional prod-like check locally:

```powershell
npm run build
npm run preview
```

## 1) Local development
- Start dev server

```powershell
npm run dev
```

- Open the printed URL (e.g., http://localhost:5173 or 5174). Vite serves `/src/main.jsx` only in dev.

---

## 2) Build production bundle
- Build the site into `dist/`

```powershell
npm run build
```

This generates:
- `dist/index.html` (references hashed CSS/JS in `dist/assets`)
- `dist/assets/*` (bundled assets)

---

## 3) Publish to GitHub Pages (development/docs)
GitHub Pages must serve the built files, not the dev entry. We mirror `dist/` → `docs/` on the `development` branch and push.

Run these in Windows PowerShell:

```powershell
# 1) Build fresh
npm run build

# 2) Mirror the build into docs/
if (!(Test-Path .\docs)) { New-Item -ItemType Directory -Path .\docs | Out-Null }
robocopy .\dist .\docs /MIR

# 3) Ensure custom domain and disable Jekyll processing
Copy-Item -Force .\CNAME .\docs\CNAME
New-Item -ItemType File -Path .\docs\.nojekyll -Force | Out-Null

# 4) Commit and push docs/ to development
git add -A
git commit -m "Deploy dist to docs for GitHub Pages (development branch)"
git push origin development
```

GitHub repository settings:
- Settings → Pages
  - Source: Branch = `development`
  - Folder = `/docs`
  - Save

Domain:
- Settings → Pages → Custom domain: `dev.fixdq.org` (should match `docs/CNAME`)

Wait ~1–2 minutes for Pages to publish. Then visit: https://dev.fixdq.org

---

## 4) Why a blank page can happen (and how to fix it)
Blank pages generally mean the browser didn’t load or run your bundle.

Common causes:
- Serving the dev entry on production:
  - If root `index.html` references `/src/main.jsx` on GitHub Pages, it will not run (JSX is not bundled). Production must serve `docs/index.html` built by Vite.
  - Fix: follow step 3 to publish `dist/` → `docs/` and ensure Pages serves `development` + `/docs`.

- Wrong Pages source:
  - Pages is set to `development` (root) or `gh-pages` when you’re publishing to `docs/`.
  - Fix: Settings → Pages → Source = `development` and Folder = `/docs`.

- Missing CNAME or .nojekyll:
  - Without `docs/CNAME`, the domain may not map or may cache old content.
  - Some hashed asset paths can be interfered with by Jekyll; `.nojekyll` avoids that.

- Cached old page:
  - Hard refresh the browser (Ctrl+F5). Try an incognito window.

- 404s for assets in Console/Network:
  - Ensure `docs/index.html` and `docs/assets/*` exist on the `development` branch.

---

## 5) Optional: Deploy using a gh-pages branch instead of docs/
If you prefer a dedicated `gh-pages` branch:

```powershell
npm run build
# Publish the dist/ folder to gh-pages (one-off or as needed)
git subtree push --prefix dist origin gh-pages
```

Then set Settings → Pages → Source = `gh-pages` (folder `/`). Add `CNAME` and `.nojekyll` in the `gh-pages` branch root.

---

## 6) Notes
- Keep `index.html` in the repo root pointing to `/src/main.jsx` for local dev only. Production content comes from `docs/index.html` (built output).
- The “US Citizenship” button uses a normal anchor. On production, the site should load and the header should be clickable. If a click still appears “dead,” open Console to check for any asset 404s or CSP errors.
- SPA routing: We include `public/404.html` so direct route loads (e.g., `/fmcsa-compliance`) fall back to the SPA entry point on GitHub Pages.

---

## 7) GitHub Actions (preferred)
This repo includes a workflow at `.github/workflows/deploy-dev.yml` that builds with Vite and deploys to GitHub Pages automatically on every push to `development`.

One-time setup in GitHub:
- Settings → Pages → Build and deployment → Source = GitHub Actions

Then just push to `development`:
- The workflow will:
  - Install deps (npm ci)
  - Build (npm run build)
  - Add CNAME and .nojekyll to the artifact
  - Publish to GitHub Pages

You can also run it manually from the Actions tab ("Run workflow").

Tip: Work on feature branches (e.g., `dev-1`), then merge/push to `development` to trigger deploy.

---

## 8) Logo setup and sizing

Where to place the logo:
- File path: `src/assets/logos/fixdq.png`
- We import it in `GlobalHeader.jsx` with Vite’s asset handling, so it’s bundled and optimized in production builds.

Recommended sizes and formats:
- Format: PNG with transparent background for now (SVG preferred long-term).
- Display heights (handled via CSS breakpoints in `GlobalHeader.css`):
  - Mobile: 28 px
  - Tablet (≥768px): 36 px
  - Desktop (≥1024px): 44 px
- For crispness on HiDPI screens, make the source PNG at least 2× the largest display height (e.g., ~88–120 px tall), width auto.

How to change the logo later:
- Replace `src/assets/logos/fixdq.png` with the new file (same name) and save. In local dev, the browser will refresh automatically. For production, rebuild and deploy.

---

## 9) Assets: src/assets vs public
- `src/assets/**`: bundled by Vite (cache-busted filenames, tree-shaken where possible). Use for images referenced by components via imports.
- `public/**`: served as-is at the site root (e.g., `/images/...`). Use for static files that must keep their names/paths.

