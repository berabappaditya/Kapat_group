import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const footMain = {
    backgroundColor: "black",
    textAlign: "center",
    fontSize: "1.3vw",
    fontWeight: "200",
    color: "white",
    padding: "3vh 0 5vh 0",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#e8f1f4",
      }}
    >
      <footer style={footMain} className="footer-child">
        {" "}
        <p style={{ color: "#008BFF", fontSize: "1.8rem", fontWeight: "500" }}>
          Contact Us
        </p>
        Shiv Nadar University-School of Natural Science-Department of
        Chemistry-NH - 91, Tehsil Dadri
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
    </div>
  );
}
