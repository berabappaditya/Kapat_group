# Editing the website with Sanity

The site's content (news, members, publications, research areas, facilities,
open positions, the PI page, footer contact) lives in a Sanity CMS —
project **`vtabhoqf`**, dataset **`production`**. You edit it in a web
interface called the **Studio**; the website picks the content up at build
time.

## Opening the Studio

**On the deployed site:** go to **`https://YOUR-SITE/studio/`** — the Studio
is built into the website itself. Sign in with your sanity.io account
(Google/GitHub/email) and edit; only invited project members can log in.

**Locally during development:**

```bash
cd studio
npm run dev
```

Then open **http://localhost:3333/studio/** (visiting
http://localhost:3000/studio on the dev server forwards you there). Either
way you'll see the content sidebar:

- **Site Settings** — site title, tagline, footer address/email/phone
- **Home Page** — hero text, carousel slides, the three open-position blocks
- **About PI** — name, photo, bio paragraphs, education, experience, awards
- **News Item / Group Member / Group Photo / Publication / Research Area /
  Facility** — the lists. Each entry has an **Order** number; lower numbers
  appear first on the site (for news and publications, newest = lowest).

Make a change, then press **Publish** (bottom right). Unpublished drafts are
saved automatically but do not reach the website.

### Optional: host the Studio online

To edit from any machine without running anything locally:

```bash
cd studio
npx sanity deploy        # pick a hostname, e.g. kapat-group
```

That gives you a permanent URL like `https://kapat-group.sanity.studio`.
Re-run the same command whenever the schemas in `studio/schemas/` change.

### Inviting other editors

At https://www.sanity.io/manage → project **Kapat Research Group** →
**Members**, invite group members by email (Editor role lets them edit and
publish content but not change project settings).

## How published content reaches the website

The site fetches content **live from Sanity's CDN in the browser**: every
page renders instantly from bundled fallback JSON, then swaps in the latest
published content. So the workflow is simply:

**Edit in Studio → Publish → the live site shows it on the next page load**
(the CDN can take up to ~1 minute). No rebuild or redeploy needed.

The bundled fallback in `src/content/` is refreshed automatically from
Sanity on every `npm run build` (or manually via `npm run sync-content`),
so even the pre-fetch first paint stays current with each deploy. If
Sanity is ever unreachable, visitors just see the fallback — the site
never breaks because of the CMS.

Notes:

- Images are pasted as URLs (currently Cloudinary). Upload the image to
  Cloudinary first, copy its URL, and paste it into the image field.
- Nav menu items and routes live in code, not the CMS.

## Deploying the frontend to Netlify

1. In Netlify: **Site settings → Environment variables**, add
   - `REACT_APP_SANITY_PROJECT_ID` = `vtabhoqf`
   - `REACT_APP_SANITY_DATASET` = `production`
   (`.env` files are gitignored, so Netlify must have its own copies.
   The `SANITY_STUDIO_*` pair and the Node version are already committed
   in `netlify.toml` — the Studio build requires Node 20+, pinned to 22.)
2. Build command `npm run build`, publish directory `build` (both also set
   in `netlify.toml`). The `postbuild` hook builds the Studio into
   `build/studio` automatically, and `public/_redirects` routes both the
   site's react-router pages and `/studio/*` correctly.
3. After the first deploy, allow the site's origin to call the Sanity API —
   **with credentials**, so the embedded Studio's login works:
   ```bash
   cd studio
   npx sanity cors add https://YOUR-SITE-NAME.netlify.app --credentials
   ```
   Repeat for a custom domain if you attach one later. Without this, the
   site silently falls back to the bundled JSON and the Studio login fails.

## One-time / recovery commands

All run from `studio/` and need `npx sanity login` once per machine.

```bash
# Re-import the original seed content (overwrites the dataset!)
node ../scripts/build-sanity-seed.js       # regenerate from src/content/*.json
npx sanity dataset import ./scripts/sanity-seed.ndjson production --replace

# Check/fix dataset visibility (must be public for the tokenless sync)
npx sanity dataset visibility get production
npx sanity dataset visibility set production public

# Allowed browser origins for the Studio
npx sanity cors list
```

Project config lives in `studio/.env` (Studio) and `.env` (sync script) —
both hold the same project ID. `SANITY_READ_TOKEN` in `.env` is only needed
if the dataset is ever made private.
