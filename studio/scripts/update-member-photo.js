/**
 * Sets photoUrl on a single member document. Run from studio/:
 *
 *   npx sanity exec scripts/update-member-photo.js --with-user-token
 *
 * A single-field patch rather than a document replace — member photos were
 * wiped once before by a broad `dataset import --replace`, so photo changes
 * are kept as narrow as possible.
 */
import { getCliClient } from "sanity/cli";

const MEMBER_ID = "member-prashant-b-sing"; // Prashant B. Singh (PhD Scholar)
const PHOTO_URL =
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784958435/20250321_144929_he3pau.jpg";

const client = getCliClient({ apiVersion: "2023-08-01" });

async function main() {
  const before = await client.getDocument(MEMBER_ID);
  if (!before) throw new Error(`document not found: ${MEMBER_ID}`);

  await client.patch(MEMBER_ID).set({ photoUrl: PHOTO_URL }).commit();

  const after = await client.getDocument(MEMBER_ID);
  console.log(`${after.name} (${after.category})`);
  console.log(`  was: ${before.photoUrl}`);
  console.log(`  now: ${after.photoUrl}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
