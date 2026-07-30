export default {
  name: "newsGroup",
  title: "News Group",
  type: "document",
  fields: [
    {
      name: "category",
      title: "Category (Semester label)",
      type: "string",
      description: 'e.g. "Spring Semester 2026"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      title: "News Items",
      type: "array",
      of: [{ type: "text" }],
      description: "Each entry is a single news/update bullet point",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first (most recent = 0)",
    },
  ],
  orderings: [
    {
      title: "Site order (newest first)",
      name: "siteOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "category", subtitle: "order" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: `Order #${subtitle}`,
    }),
  },
};
