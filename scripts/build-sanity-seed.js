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
const patents = content("patents.json");
const group = content("group.json");

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

// `dataset import --replace` fails outright if two documents share an _id —
// two entries with the same title/caption/name (e.g. a duplicated gallery
// photo) would otherwise slug to the same id and break every future import.
// Suffixing repeats keeps the id deterministic for a given source order
// while guaranteeing uniqueness.
const usedIds = new Set();
const uniqueId = (prefix, text) => {
  const base = `${prefix}-${slug(text)}`;
  let id = base;
  let n = 2;
  while (usedIds.has(id)) id = `${base}-${n++}`;
  usedIds.add(id);
  return id;
};

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
  ...(pi.editorial ? { editorial: withKeys(pi.editorial) } : {}),
  ...(pi.invitedTalks ? { invitedTalks: withKeys(pi.invitedTalks) } : {}),
});

const newsGroups = content("news.json");

// --- Lists (order = current position in the JSON) -------------------------
newsGroups.forEach((group, index) => {
  docs.push({
    _id: uniqueId("newsGroup", group.category),
    _type: "newsGroup",
    category: group.category,
    items: group.items,
    order: index,
  });
});

// Real Sanity _ids are claimed first so a same-name member's slug fallback
// (below) can never collide with one.
group.members.forEach((member) => {
  if (member.id) usedIds.add(member.id);
});

group.members.forEach((member, index) => {
  docs.push({
    // `id` is the real Sanity _id, carried through by sync-content.js so
    // re-imports replace the live documents instead of duplicating them.
    _id: member.id || uniqueId("member", member.name),
    _type: "member",
    name: member.name,
    category: member.category,
    ...(member.role ? { role: member.role } : {}),
    ...(member.joinYear ? { joinYear: member.joinYear } : {}),
    ...(member.tenurePeriod ? { tenurePeriod: member.tenurePeriod } : {}),
    ...(member.internship ? { internship: member.internship } : {}),
    ...(member.currentPosition ? { currentPosition: member.currentPosition } : {}),
    bio: member.details,
    ...(member.img ? { photoUrl: member.img } : {}),
    order: index,
  });
});

group.photos.forEach((photo, index) => {
  docs.push({
    _id: uniqueId("groupPhoto", photo.caption),
    _type: "groupPhoto",
    caption: photo.caption,
    imageUrl: photo.img,
    order: index,
  });
});

// Same document type, separated by `category`. Group photos deliberately
// omit the field — sync-content.js coalesces a missing category to "group",
// so the 40 existing documents need no rewrite.
(group.conferencePhotos || []).forEach((photo, index) => {
  docs.push({
    _id: uniqueId("conferencePhoto", photo.caption),
    _type: "groupPhoto",
    category: "conference",
    caption: photo.caption,
    imageUrl: photo.img,
    order: index,
  });
});

publications.items.forEach((pub, index) => {
  docs.push({
    _id: uniqueId("publication", pub.title),
    _type: "publication",
    title: pub.title,
    authors: pub.authors,
    journal: pub.journal,
    year: pub.year,
    volume: pub.volume,
    pages: pub.pages,
    ...(pub.url ? { url: pub.url } : {}),
    ...(pub.status ? { status: pub.status } : {}),
    ...(pub.coverImg ? { coverUrl: pub.coverImg } : {}),
    ...(pub.graphicImg ? { graphicUrl: pub.graphicImg } : {}),
    ...(pub.note ? { note: pub.note } : {}),
    order: index,
  });
});

patents.forEach((patent, index) => {
  docs.push({
    _id: uniqueId("patent", patent.title),
    _type: "patent",
    title: patent.title,
    authors: patent.authors,
    milestones: patent.milestones,
    ...(patent.img ? { imageUrl: patent.img } : {}),
    order: index,
  });
});

research.forEach((area, index) => {
  docs.push({
    _id: uniqueId("researchArea", area.title),
    _type: "researchArea",
    title: area.title,
    details: area.details,
    imageUrl: area.img,
    order: index,
  });
});

facilities.forEach((facility, index) => {
  docs.push({
    _id: uniqueId("facility", facility.name),
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
