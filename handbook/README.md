# FixDQ Handbook

Single, consolidated guide for overview, development, and deployment.

## 1) Overview
- Stack: Vite 7, React 19, React Router v6, ESLint.
- Hosting: GitHub Pages (branch: development, folder: /docs), custom domain: dev.fixdq.org.

### Project layout (src)
- `components/GlobalHeader/` – app header and hero (JSX + CSS)
- `pages/HomePage/` – landing page (JSX + CSS)
- `assets/` – images/logos (bundled by Vite)
- `global.css` – variables and global imports
- `main.jsx` – React entry + routing

### Scripts
- `npm run dev` – start dev server (HMR)
- `npm run build` – build to `dist/`
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint
- `npm run deploy` – build and mirror `dist/` → `docs/` (with CNAME, .nojekyll, redirect)

## 2) Getting started
```powershell
npm install
npm run dev
```
Open the printed localhost URL. Edit files under `src/`.

## 3) Development guide
### Conventions
- Mobile‑first CSS with reusable variables in `:root` (see `global.css`).
- Keep page/component CSS near the component and import via `global.css` (or directly in the component, as preferred).
- Routes are declared in `src/main.jsx`. Current routes:
  - `/` → `HomePage`

### Adding a page (example)
1) Create files under `src/pages/<FeatureName>/`
2) Add the `<Route path="/<slug>" element={<Component/>} />` to `main.jsx`
3) Optionally add a nav button in `GlobalHeader.jsx` (`navigationItems`)
4) Run `npm run dev` and test on mobile + desktop widths

### Linting & formatting
- Run `npm run lint` before commits. Prettier can be added later if desired.

## 4) Deployment guide
We publish the built app (dist/) to GitHub Pages from the `development` branch in the `/docs` folder.

### Quick deploy
```powershell
npm run deploy; git add -A; git commit -m "Deploy dist to docs"; git push origin development
```
`npm run deploy` builds, mirrors `dist/` → `docs/`, ensures `docs/CNAME` = `dev.fixdq.org`, writes `.nojekyll`, and adds a `/docs` → `/` redirect.

GitHub repo settings:
- Settings → Pages → Source: Branch = `development`, Folder = `/docs`
- Custom domain: `dev.fixdq.org` (must match `docs/CNAME`)

### Local prod check
```powershell
npm run build
npm run preview
```

### Blank page troubleshooting
- Ensure Pages serves built files from `development` + `/docs`.
- Verify `docs/index.html` and `docs/assets/*` exist on the branch.
- Include `public/404.html` for SPA deep-link fallback.
- Hard refresh browser (Ctrl+F5) if cached.

## 5) Notes
- Logo file: `src/assets/logos/fixdq.png` (sizes via CSS in GlobalHeader.css).
- `scripts/sync-dist-to-docs.mjs` performs dist→docs sync and domain setup.
