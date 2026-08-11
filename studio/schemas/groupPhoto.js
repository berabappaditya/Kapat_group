export default {
  name: "groupPhoto",
  title: "Group Photo",
  type: "document",
  fields: [
    { name: "caption", title: "Caption", type: "string" },
    {
      name: "category",
      title: "Gallery section",
      type: "string",
      description:
        "Which section of the Gallery tab this photo appears in. Existing photos with no value set are treated as Group Photos.",
      initialValue: "group",
      options: {
        list: [
          { title: "Group Photos", value: "group" },
          { title: "Conference Photos", value: "conference" },
        ],
      },
    },
    { name: "imageUrl", title: "Image URL", type: "url" },
    {
      name: "order",
      title: "Order",
      description: "Ordered within its own gallery section",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Site order",
      name: "siteOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "caption", subtitle: "category" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle === "conference" ? "Conference Photos" : "Group Photos",
    }),
  },
};
