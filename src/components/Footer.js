import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const footMain = {
    backgroundColor: "black",
    textAlign: "center",
    fontSize: "1.5vw",
    fontWeight: "480",
    color: "white",
    padding: "3vh 0 5vh 0",
  };
  return (
    <footer style={footMain}>
      {" "}
      <p style={{ color: "#008BFF", fontSize: "2rem", fontWeight: "500" }}>
        Contact Us
      </p>
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
