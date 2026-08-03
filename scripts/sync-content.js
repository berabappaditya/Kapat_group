/**
 * Build-time content sync: fetches all site content from Sanity and
 * regenerates the JSON files in src/content/, which components import
 * statically. Runs automatically before `npm run build` (prebuild hook);
 * run manually with `npm run sync-content`.
 *
 * - Without REACT_APP_SANITY_PROJECT_ID configured, it's a no-op: the
 *   build ships whatever is committed in src/content/.
 * - If the API is unreachable, it warns and keeps the existing files
 *   rather than failing the build.
 * - Fields that live in code, not the CMS (site.nav, publications
 *   sectionTitle), are preserved from the existing files.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "src", "content");

// --- Minimal .env loader (no dotenv dependency) ----------------------------
function loadDotEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
}
loadDotEnv();

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID;
const dataset = process.env.REACT_APP_SANITY_DATASET || "production";
const token = process.env.SANITY_READ_TOKEN; // only needed for private datasets

if (!projectId || projectId === "your-project-id") {
  console.log(
    "[sync-content] REACT_APP_SANITY_PROJECT_ID not set — keeping the bundled content in src/content/."
  );
  process.exit(0);
}

// One request for everything the site needs, shaped like the JSON files.
const QUERY = `{
  "site": *[_id == "siteSettings"][0]{
    "brand": {"title": title, "subtitle": subtitle},
    "footer": {
      "heading": footerHeading,
      "addressLine1": addressLine1,
      "addressLine2": addressLine2,
      "email": email,
      "phone": phone
    }
  },
  "home": *[_id == "homePage"][0]{
    "hero": {"lede": heroLede},
    "carousel": slides[]{"img": imageUrl},
    "openPositions": {
      "phd": phd{heading, text, email},
      "postdoc": postdoc{heading, intro, "fellowships": fellowships[]{label, url}, closing},
      "internship": internship{heading, text, email}
    }
  },
  "news": *[_type == "newsItem"] | order(order asc){text},
  "aboutPi": *[_id == "aboutPi"][0]{
    name,
    "photo": photoUrl,
    bio,
    "education": education[]{date, detail},
    "experience": experience[]{period, position},
    "recognition": recognition[]{title, year}
  },
  "research": *[_type == "researchArea"] | order(order asc){title, details, "img": imageUrl},
  "facilities": *[_type == "facility"] | order(order asc){name, "img": imageUrl},
  "publications": *[_type == "publication"] | order(order asc){
    title, authors, journal, year,
    "volume": coalesce(volume, ""),
    "pages": coalesce(pages, ""),
    "url": coalesce(url, "")
  },
  "members": *[_type == "member"] | order(order asc){
    "id": _id, name, category, role, joinYear, tenurePeriod,
    internship, currentPosition, "details": bio, "img": photoUrl
  },
  "photos": *[_type == "groupPhoto"] | order(order asc){caption, "img": imageUrl}
}`;

const readJson = (file) =>
  JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"));

const writeJson = (file, data) => {
  fs.writeFileSync(
    path.join(CONTENT_DIR, file),
    JSON.stringify(data, null, 2) + "\n"
  );
  console.log(`[sync-content] wrote src/content/${file}`);
};

async function main() {
  const url = `https://${projectId}.api.sanity.io/v2024-06-01/data/query/${dataset}?query=${encodeURIComponent(
    QUERY
  )}`;

  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) {
    throw new Error(`Sanity API responded ${response.status}: ${await response.text()}`);
  }
  const { result } = await response.json();

  // --- site.json (nav stays in code: routes are structural) ---------------
  if (result.site) {
    const existing = readJson("site.json");
    writeJson("site.json", {
      brand: result.site.brand,
      nav: existing.nav,
      footer: result.site.footer,
    });
  } else {
    console.warn("[sync-content] siteSettings missing in dataset — kept site.json");
  }

  // --- home.json -----------------------------------------------------------
  if (result.home) {
    writeJson("home.json", {
      hero: result.home.hero,
      carousel: result.home.carousel || [],
      news: (result.news || []).map((n) => n.text),
      openPositions: result.home.openPositions,
    });
  } else {
    console.warn("[sync-content] homePage missing in dataset — kept home.json");
  }

  // --- about-pi.json ---------------------------------------------------------
  if (result.aboutPi) {
    writeJson("about-pi.json", result.aboutPi);
  } else {
    console.warn("[sync-content] aboutPi missing in dataset — kept about-pi.json");
  }

  // --- simple lists ----------------------------------------------------------
  if (result.research && result.research.length > 0) {
    writeJson("research.json", result.research);
  }
  if (result.facilities && result.facilities.length > 0) {
    writeJson("facilities.json", result.facilities);
  }
  if (result.publications && result.publications.length > 0) {
    const existing = readJson("publications.json");
    writeJson("publications.json", {
      sectionTitle: existing.sectionTitle,
      items: result.publications,
    });
  }
  if (result.members && result.members.length > 0) {
    // GROQ returns null for absent fields; drop them so optional keys stay
    // out of the JSON (the seed builder spreads them conditionally).
    const members = result.members.map((member) =>
      Object.fromEntries(
        Object.entries(member).filter(([, value]) => value != null)
      )
    );
    writeJson("group.json", {
      members,
      photos: result.photos || [],
    });
  }

  console.log("[sync-content] done.");
}

main().catch((error) => {
  console.warn(
    `[sync-content] WARNING: could not fetch from Sanity (${error.message}).\n` +
      "[sync-content] Building with the existing content in src/content/."
  );
  process.exit(0);
});
