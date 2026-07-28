import React from "react";
import newsDataFallback from "../content/news.json";
import { useContent } from "../lib/useContent";

const NEWS_QUERY = `*[_type == "newsGroup"] | order(order desc) { category, items }`;

function GroupNews() {
  const newsData = useContent(NEWS_QUERY, newsDataFallback);

  return (
    <div className="page">
      <header className="group-hero">
        <img src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1784918675/IMG-20241123-WA0055_n1o0s3.jpg" alt="Group News hero" />
        <div className="group-hero-veil" aria-hidden="true"></div>
        <div className="group-hero-title container">
          <p className="eyebrow">Updates & Announcements</p>
          <h1 className="display">Group News</h1>
        </div>
      </header>

      <div className="container news-timeline-container">
        <div className="news-timeline">
          {newsData.map((section, idx) => (
            <div className="news-section" key={idx} data-reveal>
              <div className="news-section-header">
                <h2>{section.category}</h2>
                <div className="news-line"></div>
              </div>
              <ul className="news-cards">
                {section.items.map((item, i) => (
                  <li className="news-card" key={i}>
                    <p>{item}</p>
                    {/* Placeholder for future images as requested by the user */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupNews;

