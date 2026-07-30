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
      title: "National & International Recognition",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Award / Grant", type: "string" },
            { name: "year", title: "Year(s)", type: "string" },
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        },
      ],
    },
    {
      name: "editorial",
      title: "Editorial Appointments & Review Activities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Activity / Role", type: "string" },
            { name: "year", title: "Year", type: "string" },
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        },
      ],
    },
    {
      name: "invitedTalks",
      title: "Invited Talks & Conference Participation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Event / Role", type: "string" },
            { name: "date", title: "Date (e.g. March 2026)", type: "string" },
          ],
          preview: {
            select: { title: "title", subtitle: "date" },
          },
        },
      ],
    },
  ],
};
