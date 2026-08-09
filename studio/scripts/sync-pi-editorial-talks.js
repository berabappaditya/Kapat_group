/**
 * Sets aboutPi.editorial and aboutPi.invitedTalks from src/content/about-pi.json.
 * These two arrays existed in the schema and on the page since the redesign,
 * but the sync-content.js GROQ query never selected them and
 * build-sanity-seed.js never emitted them — so they had no content anywhere.
 * Both scripts were fixed alongside this one; this just backfills the
 * document that's already live.
 *
 * Run from studio/:
 *   npx sanity exec scripts/sync-pi-editorial-talks.js --with-user-token
 */
import { readFileSync } from "node:fs";
import { getCliClient } from "sanity/cli";

const pi = JSON.parse(
  readFileSync(new URL("../../src/content/about-pi.json", import.meta.url), "utf8")
);

const key = (i) => `k${i}`;
const withKeys = (items) => items.map((item, i) => ({ _key: key(i), ...item }));

const client = getCliClient({ apiVersion: "2023-08-01" });

async function main() {
  await client
    .patch("aboutPi")
    .set({
      editorial: withKeys(pi.editorial),
      invitedTalks: withKeys(pi.invitedTalks),
    })
    .commit();
  console.log(
    `Set editorial (${pi.editorial.length}) and invitedTalks (${pi.invitedTalks.length}) on aboutPi.`
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
