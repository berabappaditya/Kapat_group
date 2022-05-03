import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
          <Link className="nav-item nav-link nolink nav-menue" to="/home">
            Home
          </Link>
          <Link className="nav-item nav-link nolink nav-menue" to="/aboutPI">
            AboutPI
          </Link>
          <Link className="nav-item nav-link nolink nav-menue" to="/research">
            Research
          </Link>
          <Link
            className="nav-item nav-link nolink nav-menue"
            to="/publication"
          >
            Publication
          </Link>
          <Link className="nav-item nav-link nolink nav-menue" to="/group">
            Group
          </Link>
          <Link className="nav-item nav-link nolink nav-menue" to="/facilities">
            Facilities
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
