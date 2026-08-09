/**
 * Reorders the current PhD (graduate-category) members so Naga sits second
 * to last, matching the sequence the PI specified:
 *   Asrar, Prashant, Lokesh, Ajay, Naga, Arushi.
 *
 * Naga and Prashant B. Singh shared order:1 (a leftover tie from the original
 * seed), which the site's GROQ query happened to resolve with Naga first.
 * Asrar/Prashant/Lokesh/Ajay already sit at the right slots (0-3), so only
 * two documents need a new value: Naga -> 4, Arushi -> 5.
 *
 * Run from studio/:
 *   npx sanity exec scripts/reorder-graduate-members.js --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-08-01" });

async function main() {
  await client
    .transaction()
    .patch("member-naga-malleswara-rao", { set: { order: 4 } })
    .patch("member-arushi-phillips", { set: { order: 5 } })
    .commit();
  console.log("Reordered: Naga -> order 4, Arushi -> order 5.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
