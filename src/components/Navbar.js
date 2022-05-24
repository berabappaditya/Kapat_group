import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { CgMenu } from "react-icons/cg";
import { MdClose } from "react-icons/md";

function Navbar() {
  const [show, setShow] = useState(false);

  return (
    <nav className="row nav-main">
      <div className="col nav-left">
        <p className="kapat_logo">Kapat Research Group</p>
        <p
          style={{ margin: "1vh 0 0 8vw", fontSize: "0.9vw" }}
          className="kapat_logo_subtitle"
        >
          The Radical Chemistry and Catalysis Laboratory
        </p>
        {/* <Link className="nav-logo" path="/home">
          
        </Link> */}
      </div>
      <div className="col menu-bar">
        {!show && (
          <CgMenu
            onClick={() => setShow(true)}
            className="menu-bar-icon"
            id="menu-bar"
          />
        )}
        {show && (
          <MdClose
            onClick={() => setShow(false)}
            className="fa-solid fa-x menu-bar-icon"
            id="menu-bar"
            style={{ color: "white" }}
          >
            x
          </MdClose>
        )}
      </div>

      <div
        onClick={() => setShow(false)}
        className="col nav-right"
        id="navbar-menu-l"
      >
        <ul className="d-flex justify-content-start">
          <li>
            <Link className="nolink nav-menu" to="/home">
              Home
            </Link>
          </li>
          <li>
            <Link className="nolink nav-menu" to="/aboutPI">
              AboutPI
            </Link>
          </li>
          <li>
            <Link className=" nolink nav-menu" to="/research">
              Research
            </Link>
          </li>
          <li>
            <Link className=" nolink nav-menu" to="/publication">
              Publication
            </Link>
          </li>
          <li>
            <Link className=" nolink nav-menu" to="/group">
              Group
            </Link>
          </li>
          <li>
            <Link className=" nolink nav-menu" to="/groupImg">
              Group Photos
            </Link>
          </li>
          <li>
            <Link className=" nolink nav-menu" to="/facilities">
              Facilities
            </Link>
          </li>
        </ul>
      </div>

      {show && (
        <div className="mob-menu">
          <ul>
            <li>
              <Link className="nolink nav-menu-mob" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className="nolink nav-menu-mob" to="/aboutPI">
                AboutPI
              </Link>
            </li>
            <li>
              <Link className=" nolink nav-menu-mob" to="/research">
                Research
              </Link>
            </li>
            <li>
              <Link className=" nolink nav-menu-mob" to="/publication">
                Publication
              </Link>
            </li>
            <li>
              <Link className=" nolink nav-menu-mob" to="/group">
                Group
              </Link>
            </li>

            <li>
              <Link className=" nolink nav-menu-mob" to="/facilities">
                Facilities
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
