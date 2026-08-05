export default {
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    { name: "title", title: "Paper title", type: "text", rows: 3 },
    {
      name: "authors",
      title: "Authors",
      description:
        "Plain text; the site automatically bolds “A. Kapat” / “Ajoy Kapat”",
      type: "text",
      rows: 2,
    },
    { name: "journal", title: "Journal", type: "string" },
    { name: "year", title: "Year", type: "string" },
    { name: "volume", title: "Volume", type: "string" },
    { name: "pages", title: "Page(s)", type: "string" },
    { name: "url", title: "Link (DOI or publisher page)", type: "url" },
    {
      name: "status",
      title: "Status (instead of a citation)",
      description:
        "For unpublished work, e.g. “Manuscript submitted”. Leave empty for published papers — the journal/year/volume/pages are shown instead.",
      type: "string",
    },
    {
      name: "coverUrl",
      title: "Journal cover image URL",
      description:
        "Portrait cover of the issue. Upload to Cloudinary and paste the URL.",
      type: "url",
    },
    {
      name: "graphicUrl",
      title: "Graphical abstract image URL",
      description:
        "Landscape TOC / scheme graphic shown under the citation. Must be re-hosted on Cloudinary — publisher sites block hotlinking.",
      type: "url",
    },
    {
      name: "note",
      title: "Highlight note",
      description:
        "Optional line under the entry, e.g. “This work was highlighted by Organic Chemistry Portal”.",
      type: "string",
    },
    {
      name: "order",
      title: "Order",
      description: "Lower numbers appear first (newest paper = lowest number)",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Site order",
      name: "siteOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      journal: "journal",
      year: "year",
      status: "status",
      media: "coverUrl",
    },
    prepare: ({ title, journal, year, status }) => ({
      title,
      subtitle: status || `${journal} ${year}`,
    }),
  },
};
