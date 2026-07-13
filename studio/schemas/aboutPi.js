export default {
  name: "aboutPi",
  title: "About PI",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "photoUrl", title: "Photo URL", type: "url" },
    {
      name: "bio",
      title: "Bio paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    },
    {
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "date", title: "Period", type: "string" },
            { name: "detail", title: "Degree / institution", type: "string" },
          ],
          preview: {
            select: { title: "detail", subtitle: "date" },
          },
        },
      ],
    },
    {
      name: "experience",
      title: "Professional experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "period", title: "Period", type: "string" },
            { name: "position", title: "Position", type: "string" },
          ],
          preview: {
            select: { title: "position", subtitle: "period" },
          },
        },
      ],
    },
    {
      name: "recognition",
      title: "Recognition & awards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Award", type: "string" },
            { name: "year", title: "Year(s)", type: "string" },
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        },
      ],
    },
  ],
};
