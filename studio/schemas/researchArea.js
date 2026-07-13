export default {
  name: "researchArea",
  title: "Research Area",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "details", title: "Description", type: "text", rows: 8 },
    { name: "imageUrl", title: "Figure URL", type: "url" },
    { name: "order", title: "Order", type: "number" },
  ],
  orderings: [
    {
      title: "Site order",
      name: "siteOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title" },
  },
};
