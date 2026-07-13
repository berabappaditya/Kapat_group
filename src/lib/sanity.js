import { createClient } from "@sanity/client";

// Runtime CMS access: the browser queries Sanity's CDN directly, so
// published Studio edits appear on the deployed site without a rebuild.
// Configure locally in .env; on Netlify, set the same variables in
// Site settings → Environment variables.
const projectId = process.env.REACT_APP_SANITY_PROJECT_ID;
const dataset = process.env.REACT_APP_SANITY_DATASET || "production";

export const sanityEnabled = Boolean(projectId);

export const sanityClient = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-06-01",
      useCdn: true,
    })
  : null;
