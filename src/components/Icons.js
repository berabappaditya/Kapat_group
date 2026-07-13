import React from "react";

/* Central home for every inline SVG icon on the site.
   All icons inherit color via currentColor so CSS controls their state. */

export function NavCollapseIcon(props) {
  return (
    <svg
      className="svg-icon svg-icon--main-nav"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g className="svg-icon__arrows">
        <path d="M57.6,35.5 L55.1,36.6 C56.2,31.2 55.6,25.6 53.4,20.6 C47.4,7.3 31.9,1.4 18.6,7.3 L18.6,7.3 L14.6,9.1 L15.5,11.1 L19.5,9.3 L19.5,9.3 C31.6,3.9 45.9,9.3 51.3,21.5 C53.3,26 53.9,31.1 52.9,35.9 L51.7,33.3 L49.7,34.2 L51.9,39.2 C52.1,39.8 52.8,40 53.3,39.8 L58.3,37.6 L57.6,35.5 L57.6,35.5 Z"></path>
        <path d="M45.9,51.2 L45,49.2 L41,51 L41,51 C28.9,56.4 14.6,51 9.2,38.8 C7.2,34.3 6.6,29.2 7.6,24.4 L8.7,27 L10.7,26.1 L8.5,21.1 C8.3,20.5 7.6,20.3 7.1,20.5 L2.1,22.7 L3,24.7 L5.5,23.6 C4.4,29 5,34.6 7.2,39.6 C13.1,52.8 28.7,58.8 41.9,52.9 L41.9,52.9 L45.9,51.2 L45.9,51.2 Z"></path>
      </g>
      <polygon
        className="svg-icon__plus"
        points="32 24.7 35.8 24.7 35.8 26.5 32 26.5 32 30.5 30 30.5 30 26.5 26.2 26.5 26.2 24.7 30 24.7 30 20.7 32 20.7"
      ></polygon>
      <polygon
        className="svg-icon__minus"
        points="35.7 38.1 35.7 39.9 26.2 39.9 26.2 38.1"
      ></polygon>
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8L20.5 20.5" />
    </svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

export function ChevronPrevIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14.5 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronNextIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.5 6l6 6-6 6" />
    </svg>
  );
}
