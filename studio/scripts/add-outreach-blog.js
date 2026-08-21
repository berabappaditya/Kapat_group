/**
 * Creates the "Guiding Restless Molecules into Meaningful Materials" outreach
 * event as the first outreachEvent document in the live dataset (the type
 * previously had no documents at all). Run from studio/:
 *
 *   npx sanity exec scripts/add-outreach-blog.js --with-user-token
 *
 * The _id matches what scripts/build-sanity-seed.js computes for this
 * title, so a later dataset import replaces this doc instead of duplicating
 * it. Only creates this one document; touches nothing else.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-08-01" });

const doc = {
  _id: "outreachEvent-guiding-restless-molecules-into-meaningful-materials",
  _type: "outreachEvent",
  title: "Guiding Restless Molecules into Meaningful Materials",
  place: "SNIoE Blog",
  date: "10 March 2026",
  description:
    "An editorial feature on the Kapat Lab's radical chemistry and catalysis research, from drug-inspired synthesis to light-driven polymer formation.",
  images: [
    {
      _key: "k0",
      imageUrl:
        "https://snu.edu.in/site/assets/files/24404/ajoy_kopat-05.1200x0.1600x0.webp",
      width: 1200,
      height: 841,
      label: "SNIoE Blog",
      link: "https://snu.edu.in/blogs/guiding-restless-molecules-into-meaningful-materials/",
    },
  ],
  order: 4,
};

async function main() {
  const result = await client.createIfNotExists(doc);
  console.log(`outreachEvent created/confirmed: ${result._id}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
