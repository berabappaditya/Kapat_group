import React from "react";
import site from "../content/site.json";
import { useContent } from "../lib/useContent";

const FOOTER_QUERY = `*[_id == "siteSettings"][0]{
  "heading": footerHeading, addressLine1, addressLine2, email, phone
}`;
const BRAND_QUERY = `*[_id == "siteSettings"][0]{title, subtitle}`;

export default function Footer() {
  const footer = useContent(FOOTER_QUERY, site.footer);
  const brand = useContent(BRAND_QUERY, site.brand);

  return (
    <footer className="site-footer">
      <p className="eyebrow">{footer.heading}</p>
      <p>
        {footer.addressLine1}
        <br />
        {footer.addressLine2}
      </p>
      <p>
        E: <a href={`mailto:${footer.email}`}>{footer.email}</a> &middot; Ph:{" "}
        {footer.phone}
      </p>
      <p className="foot-copy">
        {brand.title} &middot; {brand.subtitle}
      </p>
    </footer>
  );
}
