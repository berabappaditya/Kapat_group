/**
 * Sets the home hero carousel on the `homePage` singleton: drops the old
 * IMG_5951 slide and adds the two 2024/2026 group photos. Run from studio/:
 *
 *   npx sanity exec scripts/update-hero-slides.js --with-user-token
 *
 * Only sets `slides`; touches no other field. Safe to re-run. The `k{index}`
 * keys match what scripts/build-sanity-seed.js emits, so a later dataset
 * import replaces these entries instead of duplicating them.
 */
import { getCliClient } from "sanity/cli";

const SLIDES = [
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1650744750/Assym_Cat-AK.001_spdfsi.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1650744712/Asym_Cat-AK.002_qeaz38.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1653557612/Asym_Cat-AK.001_wessku.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1653559786/Lab_A221.002_sdwixa.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784918675/IMG-20241123-WA0055_n1o0s3.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784919095/20260513_192834_qcvzph.jpg",
];

const client = getCliClient({ apiVersion: "2023-08-01" });

async function main() {
  const slides = SLIDES.map((imageUrl, index) => ({
    _key: `k${index}`,
    imageUrl,
  }));
  await client.patch("homePage").set({ slides }).commit();
  console.log(`homePage.slides set to ${slides.length} slides.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
