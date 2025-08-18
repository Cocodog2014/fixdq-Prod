# FixDQ Development Guide (Global)

This document describes how the FixDQ app is organized, how to add features/pages, styling conventions, routing, and deployment. It covers global aspects; each feature folder can include its own README.md for specifics.

## Core principles
- Mobile-first by default: design, layout, spacing, and hit-target sizes start with small screens and scale up.
- Feature-first structure: top-level pages and shared UI, with feature modules under `src/pages/*` or `src/features/*` when a domain grows.
- Simple CSS: plain CSS with variables; no framework lock-in. You can migrate to CSS Modules or utilities later.
- Minimal tooling: Vite for dev/build, React Router for routing, ESLint for hygiene.

## Stack
- Build: Vite 7 (ESM, HMR)
- UI: React 19
- Router: React Router v6
- Linting: ESLint 9 (JS recommended + react-hooks + react-refresh)
- Hosting: GitHub Pages (branch: `development`, folder: `/docs`, custom domain: `dev.fixdq.org`)

## Repository layout (high level)
```
src/
  components/
    GlobalHeader/
      GlobalHeader.jsx
      GlobalHeader.css
      index.js
  pages/
    HomePage/
      HomePage.jsx
      HomePage.css
  assets/
    logos/
      fixdq.png
  global.css           # design tokens + global imports
  main.jsx             # router and route table
public/
  404.html             # SPA fallback for Pages
scripts/
  sync-dist-to-docs.mjs
index.html             # Vite dev entry
README.md              # root handbook (overview + deploy)
```

## Styling
- Central variables live in `src/global.css` under the `:root` block (colors, spacing, typography, shadows, radius).
- Page and component CSS are colocated next to their JSX file for clarity.
- Single entry point for styles: import ALL CSS through `src/global.css` (do not import CSS inside JSX files).
  - Example imports (already present):
    - `@import './components/GlobalHeader/GlobalHeader.css';`
    - `@import './pages/HomePage/HomePage.css';`
- Accessibility: keep touch targets ≥ 44px height, ensure sufficient contrast, and use semantic HTML.

### Page background convention (blue)
- Most feature pages use our primary blue gradient background for continuity.
- Apply a top-level wrapper with `background: var(--bg-gradient-primary); min-height: 100vh;` and set foreground colors for readability.
- Examples:
  - FMCSA Compliance: `.fmcsa-page { background: var(--bg-gradient-primary); min-height: 100vh; }`
  - FMCSA Regulations detail: `.fmcsa-regulations-page { background: var(--bg-gradient-primary); min-height: 100vh; } .fmcsa-regulations-page .container { color: var(--color-white); }`

## Routing
- Router is declared in `src/main.jsx` using React Router v6.
- Current routes:
  - `/` → `HomePage` (`src/pages/HomePage`)
- Add routes by importing a page component and registering a `<Route path="/slug" element={<Component/>} />`.
- Keep URL slugs kebab-case (e.g., `/vehicle-inspections`).

## Shared UI
- `GlobalHeader` is a shared component in `src/components/GlobalHeader`. It renders the hero, logo, and nav.
- To add a new top-nav item, update `navigationItems` in `GlobalHeader.jsx`. External links should use `<a>` with `rel="noopener noreferrer"`.

## Feature modules (when a domain grows)
- Create `src/features/<domain>/` with internal `pages/`, `components/`, and `styles/` as it scales.
- Keep internal imports relative to the feature folder.
- Provide a short `README.md` in the feature root to document routes, state shape, and dependencies.

## Adding a new page (example)
1) Scaffold files (own folder with JSX and CSS):
```
src/pages/VehicleInspections/VehicleInspections.jsx
src/pages/VehicleInspections/VehicleInspections.css
```
2) Add the page CSS to the global import hub `src/global.css`:
```
@import './pages/VehicleInspections/VehicleInspections.css';
```
3) Import and route in `src/main.jsx`:
```
import VehicleInspections from './pages/VehicleInspections';
// ...
<Route path="/vehicle-inspections" element={<VehicleInspections />} />
```
4) Wire optional nav button in `GlobalHeader.jsx` (`navigationItems`).
5) Verify mobile and desktop breakpoints.

## Linting & formatting
- Run `npm run lint` before commits to catch common issues.
- Prettier is not configured; you may format with your editor defaults. We can add Prettier later if desired.

## Assets
- Use `src/assets/**` for images referenced by components via import (bundled + hashed in prod by Vite).
- Use `public/**` for truly static files that must preserve their path/filename (served verbatim).

## Deployment

We publish two GitHub Pages sites so dev and prod don’t fight over the same CNAME:

- fixdq-Dev → https://dev.fixdq.org (branch: `development`, folder: `/docs`)
- fixdq-Prod → https://fixdq.org (branch: `production`, folder: `/docs`)

The deploy script mirrors `dist/` → `docs/`, writes `.nojekyll`, and sets `docs/CNAME` based on the target domain.

### PowerShell commands (this repo)

Development (fixdq-Dev → dev.fixdq.org):
```
npm run deploy:dev
git add -A
git commit -m "Deploy dev"
git push origin HEAD:development
```

Production (fixdq-Prod → fixdq.org):
```
npm run deploy:prod
git add -A
git commit -m "Deploy prod"
git push production HEAD:production
# If rejected because remote has commits:
git fetch production
git push --force-with-lease production HEAD:production
```

### GitHub Pages settings
- fixdq-Dev repo: Settings → Pages → Source = Branch `development`, Folder `/docs`, Custom Domain `dev.fixdq.org`.
- fixdq-Prod repo: Settings → Pages → Source = Branch `production`, Folder `/docs`, Custom Domain `fixdq.org`.

### DNS records
- fixdq.org (apex/root) A records (GitHub Pages):
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- dev.fixdq.org CNAME:
  - `dev  CNAME  yourgithubusername.github.io`

## Troubleshooting
- White/blank page on Pages: Pages must serve `docs/index.html` (built output). Verify branch + `/docs` settings, and that `docs/index.html` and `docs/assets/*` exist.
- Assets 404 in DevTools → Network: rebuild and redeploy (`npm run deploy:dev` or `npm run deploy:prod`).
- Missing domain: confirm `docs/CNAME` matches the repo’s custom domain and that DNS is correct.
- SPA deep link 404s: `public/404.html` handles redirects to the SPA entry.
- Dev server issues: if HMR is stuck, restart `npm run dev`.

## Next steps (suggested)
- Add Prettier and a basic test setup (Vitest + React Testing Library).
- Consider CSS Modules for component-scoped styles if the CSS grows complex.
- Add a GitHub Actions workflow later if you want to automate `dist` → `docs` publishing.
