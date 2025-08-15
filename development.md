# FixDQ Development Guide

This guide explains how the FixDQ app is set up and how we organize code, styles, routes, and deployments.

## Stack overview
- Build tool: Vite 7 (ESM, fast dev server, HMR)
- UI: React 19 + React Router v6
- Linting: ESLint (recommended JS + react-hooks + react-refresh)
- Hosting: GitHub Pages (branch: `development`, folder: `/docs`) with custom domain `dev.fixdq.org`

Prereqs
- Node.js 18+ (LTS recommended)
- npm 10+
- Windows examples use PowerShell; adapt to your shell if different.

## Install, run, build
```powershell
npm install
npm run dev          # start Vite dev server (HMR)
npm run build        # output production bundle to dist/
npm run preview      # serve the built bundle locally
npm run lint         # run ESLint
```

## Repository layout
- `src/` – app source
  - `main.jsx` – app entry; sets up `BrowserRouter` and routes
  - `GlobalHeader.jsx` + `GlobalHeader.css` – global navigation and hero
  - `HomePage.jsx` + `HomePage.css` – landing page
  - `fmcsa compliance/` – FMCSA page (`FMCSACompliance.jsx` + CSS)
  - `assets/` – images, icons, and logos bundled by Vite (e.g., `assets/logos/fixdq.png`)
- `public/` – static files served as-is at site root; includes `404.html` for SPA fallback on GitHub Pages
- `index.html` – Vite HTML entry used in development (references `/src/main.jsx`)
- `docs/` – production bundle mirror for GitHub Pages (committed on `development` branch)
- `scripts/sync-dist-to-docs.mjs` – mirrors `dist/` → `docs/`, adds `CNAME`, `.nojekyll`, and a `/docs → /` redirect
- `DEPLOYMENT.md` – deployment instructions for GitHub Pages
- `eslint.config.js` – ESLint config (ESM)
- `vite.config.js` – Vite plugins/config (React)

Note: There’s currently a folder named `src/fmcsa compliance/` (contains space). We plan to normalize this to `src/fmcsa-compliance/` and update imports. There’s also a duplicate stylesheet in `src/fmcsa/` that looks unused; we’ll remove it during cleanup.

## Conventions

### Routing
- We use `BrowserRouter` with a 404 fallback in `public/404.html` for direct-deep-link support on GitHub Pages.
- Routes are registered in `src/main.jsx` using React Router v6:
  - `/` → `HomePage`
  - `/fmcsa-compliance` → `FMCSACompliance`
- When adding routes, prefer hyphen-case paths (e.g., `/vehicle-inspections`).

### Pages vs. shared components
- Page components live under a directory that matches their route slug (e.g., `src/fmcsa-compliance/`).
- Shared UI lives at the top level (e.g., `GlobalHeader.jsx`) or in future `src/components/`.

### Styles
- Mobile-first CSS with a single import hub at `src/global.css` that pulls in page/feature styles (`GlobalHeader.css`, `HomePage.css`, etc.).
- Use CSS variables defined in `:root` (colors, spacing, typography) for consistency.
- Keep component/page CSS next to the component when practical, and import it from the component file.
- We currently use plain CSS. CSS Modules or a utility framework can be introduced later if needed.

### Assets
- Put images used by components in `src/assets/**` and import them (Vite will optimize + hash in production).
- Put truly static files that must keep their public path/name in `public/**` (served verbatim).
- Logo lives at `src/assets/logos/fixdq.png`. Swap the file to change the logo; sizes are controlled in CSS.

### Linting & formatting
- Run `npm run lint` before commits. Current rules include recommended JS + React Hooks + Vite React Refresh.
- We haven’t added Prettier yet; feel free to use your editor’s formatter. We may standardize later.

### Branching & PRs
- Default branch: `development`
- Work branches: short-lived feature branches (e.g., `dev-<n>` or `feature/<slug>`). Open PRs into `development`.
- GitHub Pages publishes from `development` → `/docs`.

## Adding a new page (example: Vehicle Inspections)
1) Create the component and styles
   - `src/vehicle-inspections/VehicleInspections.jsx`
   - `src/vehicle-inspections/VehicleInspections.css`
   - Import the CSS inside the component.

2) Register the route in `src/main.jsx`
   - Add `<Route path="/vehicle-inspections" element={<VehicleInspections />} />`

3) Add a navigation button
   - Update the `navigationItems` array in `GlobalHeader.jsx` to include the label, path, color, and icon.

4) Run and verify
   - `npm run dev` → visit the new route and check mobile/desktop.

5) Commit and open PR

## Deployment (summary)
- Build: `npm run build` → outputs `dist/`
- Mirror to `docs/`: `npm run deploy` (runs the sync script, ensures `CNAME` and `.nojekyll`, creates `/docs` redirect)
- Commit and push `docs/` to the `development` branch (GitHub Pages is configured for `development` + `/docs`).
- Details and troubleshooting are in `DEPLOYMENT.md`.

## Known cleanup tasks
- Resolve merge markers in `DEPLOYMENT.md` and `scripts/sync-dist-to-docs.mjs` (choose a single canonical text).
- Rename `src/fmcsa compliance/` → `src/fmcsa-compliance/` and update imports accordingly.
- Remove the unused `src/fmcsa/FMSCACompliance.css` duplicate if confirmed.
- Add Prettier and basic test scaffolding (Vitest/RTL) once pages stabilize.
- Optional: add a GitHub Actions workflow to automate build-and-publish to Pages.

## Troubleshooting
- Blank page on dev or prod: see the “Why a blank page can happen” section in `DEPLOYMENT.md` and check the browser console for 404s.
- SPA deep links on GitHub Pages: ensured by `public/404.html` → app entry.
- Port conflicts: set `VITE_PORT` or let Vite pick another; `npm run dev` logs the active URL.

## Contact
Questions or suggestions? Open an issue or start a PR. For product feedback, email: drivers@citizenship360.com
