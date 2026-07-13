export default {
  name: "facility",
  title: "Facility",
  type: "document",
  fields: [
    { name: "name", title: "Instrument / facility name", type: "string" },
    { name: "imageUrl", title: "Image URL", type: "url" },
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
    select: { title: "name" },
  },
};
