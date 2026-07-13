export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "title", title: "Site title", type: "string" },
    { name: "subtitle", title: "Subtitle / tagline", type: "string" },
    { name: "footerHeading", title: "Footer heading", type: "string" },
    { name: "addressLine1", title: "Address line 1", type: "string" },
    { name: "addressLine2", title: "Address line 2", type: "string" },
    { name: "email", title: "Contact email", type: "string" },
    { name: "phone", title: "Contact phone", type: "string" },
  ],
};
