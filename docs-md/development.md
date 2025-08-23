added a fix
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
- Apply a top-level wrapper with `background: var(--bg-gradient-primary); min-height: 100vh;` and set foreground/text colors for readability (see contrast rules below).
- Examples:
  - FMCSA Compliance: `.fmcsa-page { background: var(--bg-gradient-primary); min-height: 100vh; }`
  - FMCSA Regulations detail: `.fmcsa-regulations-page { background: var(--bg-gradient-primary); min-height: 100vh; } .fmcsa-regulations-page .container { color: var(--color-white); }`
  - Getting Started: `.getting-started-page { background: var(--bg-gradient-primary); min-height:100vh; color: var(--color-white); }`

#### Contrast & accessibility on gradient pages
- Default body text on a dark gradient MUST be light (`color: var(--color-white)` or rgba white ≥ 0.85 opacity).
- Headings can use pure white plus a subtle text-shadow for legibility (`text-shadow: 0 1px 2px rgba(0,0,0,0.35)`).
- Interactive elements (buttons/links) should maintain a 4.5:1 contrast ratio against their immediate background; prefer bordered light surfaces OR high‑chroma accent fills.
- Content cards/panels placed on the gradient should remain light surfaces (white / very light) with dark text to reduce eye strain for dense reading.
- Minimum contrast targets: 4.5:1 for normal text, 3:1 for large headings (WCAG AA). Run a quick check when introducing a new color pairing.

Example pattern:
```css
.my-feature-page { background: var(--bg-gradient-primary); min-height:100vh; color: var(--color-white); }
.my-feature-page h1 { color: var(--color-white); text-shadow:0 1px 2px rgba(0,0,0,.35); }
.my-feature-page .card { background:#fff; color: var(--color-gray-800); }
```

## Routing
- Router is declared in `src/main.jsx` using React Router v6.
- Current routes:
  - `/` → `HomePage` (`src/pages/HomePage`)
- Add routes by importing a page component and registering a `<Route path="/slug" element={<Component/>} />`.
- Keep URL slugs kebab-case (e.g., `/vehicle-inspections`).

## Shared UI
- `GlobalHeader` is a shared component in `src/components/GlobalHeader`. It renders the hero, logo, and nav.
- To add a new top-nav item, update `navigationItems` in `GlobalHeader.jsx`. External links should use `<a>` with `rel="noopener noreferrer"`.
- `GlobalFooter` is appended automatically to every route via a helper `withFooter()` in `src/main.jsx`. Do NOT manually import it inside individual page components (unless you purposefully want a second footer for a special landing page). If you add a *very* custom page that must hide the footer, create a dedicated route element without `withFooter()` and document the exception.

### GlobalFooter content
- Columns: Brand, Explore (internal nav), FMCSA Official (authoritative links), Connect (social), Legal (terms, privacy, policies).
- Styling: `src/components/GlobalFooter/GlobalFooter.css` imported through `global.css` like other component CSS.
- Legal pages use a single shared stylesheet `src/pages/Legal/Legal.css` (includes Terms rules). Remove or avoid creating per‑page CSS files unless a page has highly unique layout.
- Current legal routes: `/terms`, `/privacy`, `/data-handling`, `/acceptable-use`, `/cookies`, `/disclaimer` (all draft text—replace before production).

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
 - Configure global analytics (see section below) once a real GA ID is available.

## Analytics (GA4)
We support optional Google Analytics 4.

Setup:
1. Create a GA4 property → copy Measurement ID (format `G-XXXXXXXXXX`).
2. Create a `.env` (if it doesn't exist) and add:
  `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
3. Restart the dev server (Vite only reads env vars at startup).
4. Deployment: ensure the environment variable is present during build (you can keep `.env` committed here since this repo is already public and the ID is not secret, but rotate if needed).

Implementation details:
* `src/analytics/initGA.js` injects GA script once (IP anonymized, `send_page_view:false` to avoid double counting) and exposes helpers: `trackPageView`, `trackEvent`, `enableAutoClickTracking`.
* Auto page view + delegated click tracking provided by `RouteTracker.jsx` (mounted in `main.jsx`). On every route change it:
  - Derives a human readable title from the path (or uses a map) and sets `document.title` (`FixDQ | <Page>` except home)
  - Fires a `page_view` with `page_path`, `page_title`, and `page_location`
* All custom events (`trackEvent` & auto click events) now include `page_title` automatically for easier funnel / content reports.
* Because we manually manage `page_view` events, the initial `gtag('config')` call is set with `send_page_view:false` to prevent a duplicate first page view.
* Add `data-track="Custom Label"` to any element for a cleaner click label; otherwise inner text / aria-label is used.
* For custom events: `trackEvent({ action: 'download_pdf', category: 'resource', label: 'PreTrip Checklist' })`.
* Cookies page shows active/disabled status.

### Maintaining page titles
Human‑readable page titles are defined in a map inside `RouteTracker.jsx` (constant `TITLE_MAP`). When you add a new route:
1. Add the `<Route ... />` entry in `main.jsx`.
2. Add a key → value in `TITLE_MAP` (path → descriptive title). If omitted, a fallback will attempt to humanize the last URL segment.
3. (Optional) Add meta description later when an SEO solution is introduced.
4. Update `public/sitemap.xml` so crawlers can discover the new page.

### Event naming guidelines
Keep `action` verbs concise and lowercase with underscores if multi-word:
* click (auto)
* download_pdf
* start_quiz / finish_quiz
* open_modal / close_modal
Category suggestions: `interaction`, `resource`, `quiz`, `navigation`, `form`.
Labels: Short human description (<= 80 chars recommended) – avoid PII.

### Verifying analytics
Local dev: Open GA4 DebugView (configure a debug device automatically when using gtag + dev, or append `?gtm_debug=x`). You should see:
* page_view events containing page_path + page_title
* click events as you interact with navigational elements
Production: Use Realtime → View event stream; confirm page titles are populated.

### Adding custom tracked elements
Add `data-track="Meaningful Label"` to any `<button>`, `<a>`, or clickable wrapper. The delegated listener will fire automatically with action `click` and category `click`.
If you need a different action/category, call:
```
import { trackEvent } from '../analytics/initGA';
trackEvent({ action: 'start_quiz', category: 'quiz', label: 'Hours of Service Basics' });
```

### Privacy considerations
Never include names, emails, phone numbers, VINs, DOT numbers, or other identifiers in `label` or custom parameters. Keep labels generic ("PreTrip Checklist PDF" not user-specific).

## SEO / Sitemap
* Static `public/sitemap.xml` & `public/robots.txt` included. Update sitemap when adding new top-level routes.
* Consider adding meta description tags per page (add a lightweight `<Helmet>` alternative or manual tags in `index.html`).
* GitHub Pages caches aggressively; after updating sitemap allow time for search engines to re-crawl.

Privacy notes:
* IP anonymization enabled.
* No custom events added yet—only default GA4 page_view events.
* Do not add personally identifiable information (PII) to event parameters.
