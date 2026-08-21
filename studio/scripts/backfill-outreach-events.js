/**
 * outreachEvent was a brand-new schema with zero documents before this
 * script ran (its content only ever lived in src/content/outreach.json).
 * This backfills the 4 events that predate the Sanity migration so
 * sync-content.js's live query has the full history, not just the one new
 * doc added by add-outreach-blog.js. Run from studio/:
 *
 *   npx sanity exec scripts/backfill-outreach-events.js --with-user-token
 *
 * _ids match what scripts/build-sanity-seed.js computes for these titles,
 * so a later dataset import replaces these docs instead of duplicating
 * them. Uses createIfNotExists — safe to re-run, touches nothing else.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-08-01" });

const withKeys = (images) =>
  images.map((img, index) => ({ _key: `k${index}`, ...img }));

const docs = [
  {
    _id: "outreachEvent-covered-by-leading-national-newspapers-the-better-india-and-",
    _type: "outreachEvent",
    title:
      "Covered by leading national newspapers — The Better India and India Today",
    place: "Press coverage",
    date: "2024 – 2025",
    description: "",
    images: withKeys([
      {
        imageUrl:
          "https://res.cloudinary.com/ajoy-kapat/image/upload/v1785946809/Better_India_caa6eo.png",
        width: 1008,
        height: 1102,
        label: "The Better India",
        link: "https://x.com/thebetterindia/status/1926647042098479120",
      },
      {
        imageUrl:
          "https://res.cloudinary.com/ajoy-kapat/image/upload/v1785946807/India_today_qi8cgm.png",
        width: 1582,
        height: 896,
        label: "India Today",
        link: "https://www.indiatoday.in/health/story/3d-printing-your-tooth-how-an-indian-breakthrough-has-changed-dentistry-2623310-2024-10-28",
      },
    ]),
    order: 0,
  },
  {
    _id: "outreachEvent-live-demonstration-at-shiv-nadar-institution-of-eminence-day",
    _type: "outreachEvent",
    title: "Live Demonstration at Shiv Nadar Institution of Eminence Day 2025",
    place: "SNIoE Campus",
    date: "2025",
    description: "",
    images: withKeys([
      {
        imageUrl:
          "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784918911/WhatsApp_Image_2025-04-10_at_7.56.43_PM_1_nrctvv.jpg",
        width: 4000,
        height: 1638,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784918943/WhatsApp_Image_2025-04-10_at_7.56.44_PM_g08ipn.jpg",
        width: 4000,
        height: 1638,
      },
    ]),
    order: 1,
  },
  {
    _id: "outreachEvent-live-demonstration-at-the-cii-global-summit-2025-on-industry",
    _type: "outreachEvent",
    title:
      "Live Demonstration at the CII Global Summit 2025 on Industry–Academia Partnership",
    place: "India Habitat Centre, New Delhi",
    date: "5 December 2025",
    description:
      "We gave a live demonstration during the CII Global Summit on Industry–Academia Partnership on 5 December 2025 at the India Habitat Centre, New Delhi, organised by the Office of the Principal Scientific Adviser to the Government of India.",
    images: withKeys([
      {
        imageUrl:
          "https://res.cloudinary.com/ajoy-kapat/image/upload/v1785920074/GS-1_kibkkp.jpg",
        width: 3943,
        height: 2957,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/ajoy-kapat/image/upload/v1785920078/GS-2_ont1vn.png",
        width: 1812,
        height: 1152,
      },
    ]),
    order: 2,
  },
  {
    _id: "outreachEvent-live-demonstration-at-the-industry-partners-summit-2026",
    _type: "outreachEvent",
    title: "Live Demonstration at the Industry–Partners Summit 2026",
    place: "SNIoE, Delhi NCR",
    date: "2026",
    description: "",
    images: withKeys([
      {
        imageUrl:
          "https://res.cloudinary.com/ajoy-kapat/image/upload/v1785921965/IPS-2_2026_kn8kdc.jpg",
        width: 1280,
        height: 960,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/ajoy-kapat/image/upload/v1785921950/IPS-1-2026_xavg9o.jpg",
        width: 3024,
        height: 4032,
      },
    ]),
    order: 3,
  },
];

async function main() {
  for (const doc of docs) {
    const result = await client.createIfNotExists(doc);
    console.log(`outreachEvent created/confirmed: ${result._id}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
