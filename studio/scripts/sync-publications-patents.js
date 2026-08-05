/**
 * Pushes the publication and patent content in src/content/ to Sanity:
 *
 *   - creates/replaces one `publication` doc per entry (new SNU-era papers
 *     included) and rewrites `order` so the newest paper sorts first,
 *   - creates/replaces one `patent` doc per entry.
 *
 * Run from studio/:
 *
 *   npx sanity exec scripts/sync-publications-patents.js --with-user-token
 *
 * Touches only these two document types. Deterministic _ids (the same slug
 * rule scripts/build-sanity-seed.js uses) make it idempotent.
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

const publications = read("publications.json").items;
const patents = read("patents.json");

const client = getCliClient({ apiVersion: "2023-08-01" });

async function main() {
  const tx = client.transaction();

  publications.forEach((pub, index) => {
    tx.createOrReplace({
      _id: `publication-${slug(pub.title)}`,
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
    tx.createOrReplace({
      _id: `patent-${slug(patent.title)}`,
      _type: "patent",
      title: patent.title,
      authors: patent.authors,
      milestones: patent.milestones,
      ...(patent.img ? { imageUrl: patent.img } : {}),
      order: index,
    });
  });

  const result = await tx.commit();
  console.log(
    `Wrote ${result.results.length} documents ` +
      `(${publications.length} publications, ${patents.length} patents).`
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
