export default {
  name: "member",
  title: "Group Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "bio", title: "Bio", type: "text", rows: 8 },
    { name: "photoUrl", title: "Photo URL", type: "url" },
    {
      name: "order",
      title: "Order",
      description: "Lower numbers appear first on the Group page",
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
    select: { title: "name", subtitle: "order" },
  },
};
