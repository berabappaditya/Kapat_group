import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { NavCollapseIcon, MenuIcon, CloseIcon } from "./Icons";
import site from "../content/site.json";
import { useContent } from "../lib/useContent";

const BRAND_QUERY = `*[_id == "siteSettings"][0]{title, subtitle}`;

function Navbar() {
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const brand = useContent(BRAND_QUERY, site.brand);

  const navClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <nav className="site-nav">
      <Link to="/home" className="brand">
        <span className="brand-name">{brand.title}</span>
        <span className="brand-sub">{brand.subtitle}</span>
      </Link>

      <div className="nav-right">
        <ul className={collapsed ? "nav-links is-collapsed" : "nav-links"}>
          {site.nav.map((item) => (
            <li key={item.path}>
              <NavLink className={navClass} to={item.path}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={
            collapsed
              ? "nav-collapse-toggle is-collapsed"
              : "nav-collapse-toggle"
          }
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed(!collapsed)}
        >
          <NavCollapseIcon />
        </button>

        <button
          type="button"
          className="nav-toggle"
          aria-label={show ? "Close menu" : "Open menu"}
          aria-expanded={show}
          onClick={() => setShow(!show)}
        >
          {show ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {show && (
        <div className="mob-menu" onClick={() => setShow(false)}>
          <ul>
            {site.nav.map((item) => (
              <li key={item.path}>
                <NavLink className={navClass} to={item.path}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
