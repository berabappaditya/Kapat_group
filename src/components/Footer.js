import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const footMain = {
    backgroundColor: "#edf5e1",
    padding: "0.5rem 1rem",
    textAlign: "center",
    fontSize: "1.2vw",
    fontWeight: "480",
    color: "#333",
  };
  return (
    <footer style={footMain}>
      {" "}
      Contact Us
      <br />
      Shiv Nadar University-School of Natural Science-Department of Chemistry-NH
      - 91, Tehsil Dadri
      <br />
      Gautam Buddha Nagar-Uttar Pradesh - 201314-India; Email:
      <Link
        to={{
          pathname: "ajoy.kapat@snu.edu.in",
        }}
        target="_blank"
      >
        {" "}
        ajoy.kapat@snu.edu.in
      </Link>
      ; Ph: 9599626674
    </footer>
  );
}
