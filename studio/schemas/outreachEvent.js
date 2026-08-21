export default {
  name: "outreachEvent",
  title: "Outreach Event",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "place", title: "Place", type: "string" },
    { name: "date", title: "Date", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 3 },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "imageUrl", title: "Image URL", type: "url" },
            { name: "width", title: "Image width (px)", type: "number" },
            { name: "height", title: "Image height (px)", type: "number" },
            { name: "label", title: "Caption label", type: "string" },
            {
              name: "link",
              title: "Link",
              description: "Where the caption links to, if anywhere",
              type: "url",
            },
          ],
          preview: {
            select: { title: "label", subtitle: "imageUrl" },
          },
        },
      ],
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
    select: { title: "title", subtitle: "place" },
  },
};
