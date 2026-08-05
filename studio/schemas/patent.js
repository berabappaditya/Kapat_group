export default {
  name: "patent",
  title: "Patent",
  type: "document",
  fields: [
    { name: "title", title: "Patent title", type: "text", rows: 3 },
    {
      name: "authors",
      title: "Inventors",
      description:
        "Plain text; the site automatically bolds “A. Kapat” / “Ajoy Kapat”",
      type: "text",
      rows: 2,
    },
    {
      name: "milestones",
      title: "Filing history",
      description:
        "One line per step, in chronological order — filings, publication numbers, grants.",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "imageUrl",
      title: "Certificate image URL",
      description: "Upload to Cloudinary and paste the URL.",
      type: "url",
    },
    {
      name: "order",
      title: "Order",
      description: "Lower numbers appear first",
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
    select: { title: "title", authors: "authors" },
    prepare: ({ title, authors }) => ({ title, subtitle: authors }),
  },
};
