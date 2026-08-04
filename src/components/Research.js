import React from "react";
import researchFallback from "../content/research.json";
import { useContent } from "../lib/useContent";

const RESEARCH_QUERY = `*[_type == "researchArea"] | order(order asc){
  title, details, "img": imageUrl
}`;

function Research() {
  const research = useContent(RESEARCH_QUERY, researchFallback);
  return (
    <div className="page">
      <header className="group-hero">
        <img src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1784917984/images-6_wiaxby.jpg" alt="Research" />
        <div className="group-hero-veil" aria-hidden="true"></div>
        <div className="group-hero-title container">
          <p className="eyebrow">What we work on</p>
          <h1 className="display">Research</h1>
        </div>
      </header>

      <div className="container">
        {research.map((item, index) => (
          <section className="research-item" key={index} data-reveal>
            <div>
              <h2>{item.title}</h2>
              <p>{item.details}</p>
            </div>
            <div className="research-media">
              <img src={item.img} alt={item.title} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Research;
