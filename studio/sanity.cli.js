import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "YOUR_PROJECT_ID",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Asset base for `sanity build` — must match basePath in sanity.config.js
  project: {
    basePath: "/studio",
  },
});
