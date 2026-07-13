import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

// Set SANITY_STUDIO_PROJECT_ID in studio/.env (see .env.example)
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "YOUR_PROJECT_ID";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

// The three singleton documents get fixed IDs so the site can query them
// directly; everything else is a plain list.
const singletons = [
  { type: "siteSettings", id: "siteSettings", title: "Site Settings" },
  { type: "homePage", id: "homePage", title: "Home Page" },
  { type: "aboutPi", id: "aboutPi", title: "About PI" },
];

const singletonTypes = new Set(singletons.map((s) => s.type));

export default defineConfig({
  name: "default",
  title: "Kapat Research Group",
  projectId,
  dataset,
  // Served under the main site's /studio path (built into build/studio)
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            ...singletons.map((s) =>
              S.listItem()
                .title(s.title)
                .id(s.id)
                .child(S.document().schemaType(s.type).documentId(s.id))
            ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId())
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Hide singleton types from the global "create new" menu
    templates: (templates) =>
      templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(
            ({ action }) =>
              !["delete", "duplicate", "unpublish"].includes(action)
          )
        : actions,
  },
});
