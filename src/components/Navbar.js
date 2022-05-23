import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { CgMenu } from "react-icons/cg";
import { GrClose } from "react-icons/gr";

function Navbar() {
  const [show, setShow] = useState(false);
  console.log(show);
  return (
    <nav className="row nav-main">
      <div className="col nav-left">
        <p className="kapat_logo">Kapat Research Group</p>
        <p
          style={{ marginLeft: "16%", fontSize: "12px" }}
          ClassName="kapat_logo_subtitle"
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
          <GrClose
            onClick={() => setShow(false)}
            className="menu-bar-icon"
            id="menu-bar"
          />
        )}
      </div>

      <div
        onClick={() => setShow(false)}
        className="col nav-right"
        id="navbar-menu-l"
      >
        <ul className="d-flex">
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
              <Link className=" nolink nav-menu" to="/facilities">
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
