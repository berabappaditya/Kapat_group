import React from "react";
import facilitiesFallback from "../content/facilities.json";
import { useContent } from "../lib/useContent";

const FACILITIES_QUERY = `*[_type == "facility"] | order(order asc){
  name, "img": imageUrl
}`;

function Facilities() {
  const facilities = useContent(FACILITIES_QUERY, facilitiesFallback);
  return (
    <div className="page">
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Infrastructure</p>
          <h1 className="display">Facilities</h1>
        </div>
      </header>

      <div className="container">
        <div className="facility-grid">
          {facilities.map((item) => (
            <div className="facility-card" key={item.name} data-reveal>
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Facilities;
