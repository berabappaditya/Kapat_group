/**
 * One-off repair: restores the member photo URLs that were entered in the
 * Studio on 2026-08-02 and wiped by the 2026-08-03 `dataset import --replace`
 * (recovered from the Sanity history API). Run from studio/:
 *
 *   npx sanity exec scripts/restore-member-photos.js --with-user-token
 *
 * Only sets photoUrl; touches no other fields. Safe to re-run.
 */
import { getCliClient } from "sanity/cli";

const PHOTOS = {
  "member-naga-malleswara-rao":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784958431/20250321_144827_m9k5th.jpg",
  "member-lokesh-gupta":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784958438/20250321_150121_lqte6v.jpg",
  "member-ajay-shalke":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784958435/20250321_144643_gmsygw.jpg",
  "member-arushi-phillips":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784958692/Photo-Arushi_Philipps_xm5kt1.png",
  "member-tiya-garg":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784958431/20250321_144226_lkwuzg.jpg",
  "member-kumari-indu":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784959790/IMG-20250331-WA0002_dwicyq.jpg",
  "member-mansi-bhattacharya":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784958431/20250321_144500_cxsn66.jpg",
  "member-manya-singh":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784958428/20250321_143955_hqd7yn.jpg",
  "member-shreya-sivaramakrishnan":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784958434/Glovebox_Pic_fbto7d.jpg",
  "member-garvisha-summer":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1650744626/Garvisha_Mittal_unwckf.jpg",
  "member-mansi-summer":
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784958431/20250321_144500_cxsn66.jpg",
};

const client = getCliClient({ apiVersion: "2023-08-01" });

async function main() {
  const tx = client.transaction();
  for (const [id, photoUrl] of Object.entries(PHOTOS)) {
    tx.patch(id, { set: { photoUrl } });
  }
  const result = await tx.commit();
  console.log(
    `Restored photoUrl on ${result.results.length} member documents.`
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
