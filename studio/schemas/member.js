export default {
  name: "member",
  title: "Group Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    {
      name: "category",
      title: "Category",
      type: "string",
      description:
        "graduate | undergraduate | former-msc | former-undergrad | former-jrf | former-postdoc | former-summer",
      options: {
        list: [
          { title: "Current — Graduate Student", value: "graduate" },
          { title: "Current — Undergraduate Student", value: "undergraduate" },
          { title: "Former — M.Sc. Student", value: "former-msc" },
          { title: "Former — Undergraduate Student", value: "former-undergrad" },
          { title: "Former — JRF", value: "former-jrf" },
          { title: "Former — Postdoctoral Fellow", value: "former-postdoc" },
          { title: "Former — Summer Fellow", value: "former-summer" },
        ],
      },
    },
    {
      name: "role",
      title: "Role / Designation",
      type: "string",
      description: 'e.g. "PhD Scholar", "OUR Student", "M.Sc. Thesis"',
    },
    {
      name: "joinYear",
      title: "Join Year",
      type: "string",
      description: 'e.g. "2022" or "Monsoon 2022"',
    },
    {
      name: "tenurePeriod",
      title: "Tenure Period",
      type: "string",
      description: 'For former members: e.g. "2021–2023"',
    },
    { name: "bio", title: "Bio", type: "text", rows: 8 },
    { name: "photoUrl", title: "Photo URL", type: "url" },
    {
      name: "currentPosition",
      title: "Current Position",
      type: "string",
      description: "Where the member is now (for former members or notable current roles)",
    },
    {
      name: "internship",
      title: "Internship",
      type: "string",
      description: "Internship details if applicable",
    },
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
    select: { title: "name", subtitle: "category" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle || "No category",
    }),
  },
};
