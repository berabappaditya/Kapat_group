# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for the Kapat Research Group (chemistry lab at Shiv Nadar University), built with Create React App. No backend — all site content is hardcoded in JS data files.

## Commands

- `npm start` — dev server at http://localhost:3000
- `npm run build` — production build to `build/`
- `npm test` — Jest/React Testing Library in watch mode; run a single file with `npm test -- App.test.js`

## Sanity CMS

See `SANITY.md` for the editor-facing guide. Key facts:

- Live project: ID `vtabhoqf`, dataset `production` (public). Configured in `.env` (app/sync) and `studio/.env` (Studio) — both gitignored.
- **Build-time content**: components import `src/content/*.json` statically. `scripts/sync-content.js` (run by `npm run sync-content`, and automatically via the `prebuild` hook) fetches one combined GROQ query from Sanity's HTTP API (native Node fetch, no client dep) and regenerates those JSON files. If Sanity is unset/unreachable it no-ops with a warning — a CMS outage can't break the build. Fields that live in code are preserved from the existing files on each sync: `site.json` `nav` and `publications.json` `sectionTitle`.
- `studio/` holds a Sanity Studio v3 (own package.json). `npm run dev` inside it serves http://localhost:3333/studio. The Studio is **embedded in the deployed site at `/studio`**: the root `postbuild` script builds it into `build/studio` (needs `SANITY_STUDIO_*` env vars at build time), `public/_redirects` routes `/studio/*` before the SPA catch-all, and the base path must be set in **both** `studio/sanity.config.js` (`basePath`, runtime router) and `studio/sanity.cli.js` (`project.basePath`, asset URLs at build — without it assets emit as `/static/…` and 404 behind the SPA).
- Never run `npm --prefix studio install` from the repo root — a known npm quirk adds the root app as a bogus `"frontend": "file:.."` dependency in studio/package.json. Use `cd studio && npm install`.
- Content model: three singletons with fixed IDs (`siteSettings`, `homePage`, `aboutPi`) plus list types (`newsGroup`, `member`, `groupPhoto`, `publication`, `researchArea`, `facility`; `newsItem` is a dead pre-semester type — documents still exist in the dataset but nothing reads them). List types order by an `order` number field, ascending — except news, which is ordered from its semester label (see below). Images are plain `url` fields (Cloudinary URLs), not Sanity image assets.
- `node scripts/build-sanity-seed.js` regenerates `scripts/sanity-seed.ndjson` from `src/content/*.json`; import with `npx sanity dataset import ../scripts/sanity-seed.ndjson production --replace` from `studio/`. Deterministic `_id`s make re-imports idempotent. The dataset was seeded on 2026-07-13.
- After editing content in the Studio, the site is refreshed via `npm run sync-content` (dev) or any `npm run build` (deploy). `src/content/*.json` is a generated artifact once synced — GROQ alphabetizes object keys, so synced files diff against hand-written ones even with identical content.

## Architecture

- **Routing**: all in `src/App.js` (react-router-dom v6). Each route renders a page component between the shared `<Header />` (which just renders `Navbar`) and `<Footer />`. Pages: Home, AboutPI, Research, Publication, Group, Facilities. The Group page has two tab sub-routes rendered by the same component — `/group` (members) and `/group/gallery` (photos, `<Group view="gallery" />`); the legacy `/groupImg` URL 301-redirects there via `<Navigate>`.
- **Content/presentation split**: components fetch live content from Sanity in the browser via the `useContent(query, fallback)` hook (`src/lib/useContent.js` + `src/lib/sanity.js`, needs `REACT_APP_SANITY_PROJECT_ID` — in `.env` locally, in Netlify env vars when deployed). The bundled JSON under `src/content/` renders instantly as the fallback and stays if Sanity is unset, empty, errored, or CORS-blocked. GROQ projections in each component rename Sanity fields to the JSON shapes so both sources feed identical render code. Sanity is the source of truth; the JSON is a generated artifact (see Sanity CMS section) and must stay inside `src/` — CRA's webpack can't import from outside it. The files: `site.json` (brand, nav links, footer contact — Navbar renders both desktop and mobile menus from the same `nav` array), `home.json` (carousel slides, open positions), `news.json` (one entry per semester: `category` label + `items` array), `about-pi.json` (education, experience, awards), `research.json`, `facilities.json`, `group.json` (members + group photos), and `publications.json` (structured citation fields: title/authors/journal/year/volume/pages/url; `Publication.js` handles formatting and auto-bolds "A. Kapat" in author strings; entries are ordered newest-first and numbered descending).
- **News ordering**: `src/lib/newsOrder.js` decides news order for both `Home.js` and `GroupNews.js`; the CMS `order` field is not trusted for it. Semester labels are parsed into a sort key — the academic year runs Spring (Jan–May) then Monsoon (Aug–Dec), so Spring 2026 is newer than Monsoon 2025 — and groups whose label carries no year (the legacy `Recent Updates` document) sort last. The Home feed flattens every semester newest-first and measures how many rows fit beside the Open Positions panel (`useFittedCount` in `Home.js`), so it runs on into earlier semesters rather than stopping at a semester boundary.
- **Images**: all hosted on Cloudinary (`res.cloudinary.com/ajoy-kapat/...`) and referenced by URL in the data files. There are no local image assets beyond favicons in `public/`.

## Styling

The site uses a custom design-token system defined at the top of `src/App.css` (`:root` CSS variables): a **white theme with deep-navy bands** — cool-white page `--bg` (#f7f9ff) with faint radial tints, white `--surface` cards with `--line` hairlines and navy-tinted shadows (`--navy-shadow`); brand navy `--navy` (#01257d)/`--navy-deep` forms the dark bands (home/PI heroes, `.page-head`, `.positions-panel`, footer, mobile menu). Two accents by surface: **electric cyan `--cyan` (#00ffff) only on navy surfaces** (eyebrows/links/rules/glows there — it fails contrast on white) and **royal blue `--blue` (#0a3bb5) on light surfaces** (links, eyebrows, detail keys). Every navy band carries a cyan hairline edge and a faint cyan dot-grid; gradient rules run navy→cyan. Text on light is `--ink`/`--muted`. Typography is Sora (display/headings/labels, `--font-display`) over Inter body (`--font-body`), imported via Google Fonts at the top of App.css. Reusable primitives: `.container`, `.page`, `.page-head` (navy gradient band with dot-grid texture), `.eyebrow`, `.display`, `.section-head` (rule-topped, cyan-capped), `.tick-rule`. Motion: hero/page-head entrances via `fadeUp` with staggered delays; scroll-reveal via `data-reveal` attributes handled by `RevealManager` in App.js (gated behind `html.reveal-ready` so content stays visible without JS); everything respects `prefers-reduced-motion`. Navbar styles live in `src/components/Navbar.css` (glassy backdrop-blur bar). Prefer these classes over inline `style` props.

**No CSS/JS frameworks are loaded.** Bootstrap and Font Awesome were removed from `public/index.html`; the homepage hero carousel is a small React component (`Carousel.js`: auto-advancing crossfade driven by a `setTimeout` effect, styled via `.hero-slide` in App.css). The `box-sizing: border-box` reset lives in `src/index.css`. All SVG icons are components in `src/components/Icons.js` — add new icons there, not via icon libraries.

Tailwind was fully removed (configs and devDependencies) — a stray root `postcss.config.js` breaks the Sanity Studio's Vite server, so don't reintroduce one. Use the design tokens in App.css instead of utility frameworks.
