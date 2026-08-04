export default {
  name: "newsItem",
  title: "News Item (legacy — use News Group)",
  type: "document",
  description:
    "Superseded by News Group, which files each update under its semester. " +
    "Nothing on the site reads these documents; kept so the old entries stay " +
    "reachable until they are deleted.",
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
