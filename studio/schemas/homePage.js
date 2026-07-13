const emailPosition = (name, title) => ({
  name,
  title,
  type: "object",
  fields: [
    { name: "heading", type: "string" },
    { name: "text", type: "text", rows: 4 },
    { name: "email", type: "string" },
  ],
});

export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "heroLede",
      title: "Hero lede",
      description: "The short mission statement under the site title",
      type: "text",
      rows: 3,
    },
    {
      name: "slides",
      title: "Hero slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [{ name: "imageUrl", title: "Image URL", type: "url" }],
          preview: {
            select: { url: "imageUrl" },
            prepare: ({ url }) => ({ title: url }),
          },
        },
      ],
    },
    emailPosition("phd", "PhD position"),
    {
      name: "postdoc",
      title: "Post-doc position",
      type: "object",
      fields: [
        { name: "heading", type: "string" },
        { name: "intro", type: "text", rows: 4 },
        {
          name: "fellowships",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", type: "string" },
                { name: "url", type: "url" },
              ],
            },
          ],
        },
        { name: "closing", type: "text", rows: 4 },
      ],
    },
    emailPosition("internship", "Internship position"),
  ],
};
