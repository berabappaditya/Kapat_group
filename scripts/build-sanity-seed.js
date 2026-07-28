/**
 * Converts the bundled content in src/content/*.json into an NDJSON file
 * that can be imported into a Sanity dataset:
 *
 *   node scripts/build-sanity-seed.js
 *   cd studio && npx sanity dataset import ../scripts/sanity-seed.ndjson production
 *
 * Deterministic _id values make re-imports idempotent (use --replace).
 */
const fs = require("fs");
const path = require("path");

const content = (file) =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "src", "content", file), "utf8")
  );

const site = content("site.json");
const home = content("home.json");
const pi = content("about-pi.json");
const research = content("research.json");
const facilities = content("facilities.json");
const publications = content("publications.json");
const group = content("group.json");

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const key = (index) => `k${index}`;
const withKeys = (items) =>
  items.map((item, index) => ({ _key: key(index), ...item }));

const docs = [];

// --- Singletons -----------------------------------------------------------
docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  title: site.brand.title,
  subtitle: site.brand.subtitle,
  footerHeading: site.footer.heading,
  addressLine1: site.footer.addressLine1,
  addressLine2: site.footer.addressLine2,
  email: site.footer.email,
  phone: site.footer.phone,
});

docs.push({
  _id: "homePage",
  _type: "homePage",
  heroLede: home.hero.lede,
  slides: withKeys(home.carousel.map((s) => ({ imageUrl: s.img }))),
  phd: home.openPositions.phd,
  postdoc: {
    ...home.openPositions.postdoc,
    fellowships: withKeys(home.openPositions.postdoc.fellowships),
  },
  internship: home.openPositions.internship,
});

docs.push({
  _id: "aboutPi",
  _type: "aboutPi",
  name: pi.name,
  photoUrl: pi.photo,
  bio: pi.bio,
  education: withKeys(pi.education),
  experience: withKeys(pi.experience),
  recognition: withKeys(pi.recognition),
});

const newsGroups = content("news.json");

// --- Lists (order = current position in the JSON) -------------------------
newsGroups.forEach((group, index) => {
  docs.push({
    _id: `newsGroup-${slug(group.category)}`,
    _type: "newsGroup",
    category: group.category,
    items: group.items,
    order: index,
  });
});

group.members.forEach((member, index) => {
  docs.push({
    _id: `member-${slug(member.name)}`,
    _type: "member",
    name: member.name,
    bio: member.details,
    photoUrl: member.img,
    order: index,
  });
});

group.photos.forEach((photo, index) => {
  docs.push({
    _id: `groupPhoto-${slug(photo.caption)}`,
    _type: "groupPhoto",
    caption: photo.caption,
    imageUrl: photo.img,
    order: index,
  });
});

publications.items.forEach((pub, index) => {
  docs.push({
    _id: `publication-${slug(pub.title)}`,
    _type: "publication",
    title: pub.title,
    authors: pub.authors,
    journal: pub.journal,
    year: pub.year,
    volume: pub.volume,
    pages: pub.pages,
    ...(pub.url ? { url: pub.url } : {}),
    order: index,
  });
});

research.forEach((area, index) => {
  docs.push({
    _id: `researchArea-${slug(area.title)}`,
    _type: "researchArea",
    title: area.title,
    details: area.details,
    imageUrl: area.img,
    order: index,
  });
});

facilities.forEach((facility, index) => {
  docs.push({
    _id: `facility-${slug(facility.name)}`,
    _type: "facility",
    name: facility.name,
    imageUrl: facility.img,
    order: index,
  });
});

// --- Write ----------------------------------------------------------------
const outPath = path.join(__dirname, "sanity-seed.ndjson");
fs.writeFileSync(outPath, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to ${outPath}`);
