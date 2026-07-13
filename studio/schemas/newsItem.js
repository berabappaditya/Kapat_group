export default {
  name: "newsItem",
  title: "News Item",
  type: "document",
  fields: [
    { name: "text", title: "News text", type: "text", rows: 3 },
    {
      name: "order",
      title: "Order",
      description: "Lower numbers appear first (newest news = lowest number)",
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
    select: { title: "text", subtitle: "order" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: `#${subtitle}`,
    }),
  },
};
