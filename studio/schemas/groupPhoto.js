export default {
  name: "groupPhoto",
  title: "Group Photo",
  type: "document",
  fields: [
    { name: "caption", title: "Caption", type: "string" },
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
    select: { title: "caption" },
  },
};
