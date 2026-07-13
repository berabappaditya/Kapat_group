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
        "Plain text; the site automatically bolds “A. Kapat”",
      type: "text",
      rows: 2,
    },
    { name: "journal", title: "Journal", type: "string" },
    { name: "year", title: "Year", type: "string" },
    { name: "volume", title: "Volume", type: "string" },
    { name: "pages", title: "Page(s)", type: "string" },
    { name: "url", title: "Link (DOI or publisher page)", type: "url" },
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
    select: { title: "title", journal: "journal", year: "year" },
    prepare: ({ title, journal, year }) => ({
      title,
      subtitle: `${journal} ${year}`,
    }),
  },
};
