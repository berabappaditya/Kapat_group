/**
 * Pushes the corrected content in src/content/ to Sanity. Run from studio/:
 *
 *   npx sanity exec scripts/sync-site-content.js --with-user-token
 *
 * Field-level patches rather than whole-document replacement, so nothing that
 * only lives in the CMS (member photos, for one) can be wiped. The exceptions
 * are newsGroup and facility, which are fully described by the JSON.
 * Idempotent — safe to re-run.
 */
import { readFileSync } from "node:fs";
import { getCliClient } from "sanity/cli";

const read = (file) =>
  JSON.parse(readFileSync(new URL(`../../src/content/${file}`, import.meta.url), "utf8"));

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const key = (i) => `k${i}`;
const withKeys = (items) => items.map((item, i) => ({ _key: key(i), ...item }));

const site = read("site.json");
const home = read("home.json");
const pi = read("about-pi.json");
const news = read("news.json");
const publications = read("publications.json").items;
const group = read("group.json");
const facilities = read("facilities.json");

/* Facility documents that must go: two duplicates created in the Studio
   (random ids) and the retired "arriving" EPR spectrometer entry. */
const FACILITY_DELETES = [
  "d077f06e-bb14-4dd2-a853-4749cc1451a6", // duplicate EPR Facility
  "2d814baa-6fd9-4c88-bac7-d89cbe235ab5", // duplicate HPLC facility
  "facility-epr-spectrometer-jes-x320-arriving",
];

const client = getCliClient({ apiVersion: "2023-08-01" });

async function main() {
  const tx = client.transaction();

  // --- singletons ---------------------------------------------------------
  tx.patch("siteSettings", {
    set: {
      addressLine1: site.footer.addressLine1,
      addressLine2: site.footer.addressLine2,
    },
  });

  tx.patch("homePage", {
    set: {
      heroLede: home.hero.lede,
      phd: home.openPositions.phd,
      postdoc: {
        ...home.openPositions.postdoc,
        fellowships: withKeys(home.openPositions.postdoc.fellowships),
      },
      internship: home.openPositions.internship,
    },
  });

  tx.patch("aboutPi", {
    set: {
      bio: pi.bio,
      experience: withKeys(pi.experience),
    },
  });

  // --- news: one document per semester ------------------------------------
  news.forEach((entry, index) => {
    tx.createOrReplace({
      _id: `newsGroup-${slug(entry.category)}`,
      _type: "newsGroup",
      category: entry.category,
      items: entry.items,
      order: index,
    });
  });

  // --- publications: only the author line changed -------------------------
  publications.forEach((pub) => {
    tx.patch(`publication-${slug(pub.title)}`, { set: { authors: pub.authors } });
  });

  // --- members: only the fields corrected here ----------------------------
  group.members.forEach((m) => {
    if (!m.id) return;
    const set = { name: m.name, category: m.category, role: m.role };
    if (m.details) set.bio = m.details;
    if (m.tenurePeriod) set.tenurePeriod = m.tenurePeriod;
    if (m.currentPosition) set.currentPosition = m.currentPosition;
    const patch = { set };
    // joinYear is dropped for members who moved to alumni
    if (!m.joinYear) patch.unset = ["joinYear"];
    tx.patch(m.id, patch);
  });

  // --- facilities: rewrite the survivors, drop the rest -------------------
  facilities.forEach((f, index) => {
    tx.createOrReplace({
      _id: `facility-${slug(f.name)}`,
      _type: "facility",
      name: f.name,
      imageUrl: f.img,
      order: index,
    });
  });
  FACILITY_DELETES.forEach((id) => tx.delete(id));

  const result = await tx.commit();
  console.log(`Committed ${result.results.length} document operations.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
