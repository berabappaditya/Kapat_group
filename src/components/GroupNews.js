import React from "react";
import newsDataFallback from "../content/news.json";
import { useContent } from "../lib/useContent";

const NEWS_QUERY = `*[_type == "newsGroup"] | order(order desc) { category, items }`;

/* Pick a distinct accent color per category index */
const ACCENTS = [
  { dot: "#00e5ff", glow: "rgba(0,229,255,0.22)", badge: "rgba(0,229,255,0.12)", text: "#007ea8" },
  { dot: "#7c6fff", glow: "rgba(124,111,255,0.22)", badge: "rgba(124,111,255,0.12)", text: "#4d3fcc" },
  { dot: "#00d4a0", glow: "rgba(0,212,160,0.22)", badge: "rgba(0,212,160,0.12)", text: "#007a5e" },
  { dot: "#ff7a45", glow: "rgba(255,122,69,0.22)", badge: "rgba(255,122,69,0.12)", text: "#c44a10" },
  { dot: "#f5c542", glow: "rgba(245,197,66,0.22)", badge: "rgba(245,197,66,0.12)", text: "#8a6c00" },
  { dot: "#ff6b9d", glow: "rgba(255,107,157,0.22)", badge: "rgba(255,107,157,0.12)", text: "#b8004a" },
];

/* Map a category string to a small emoji icon */
function categoryIcon(category) {
  const c = category.toLowerCase();
  if (c.includes("recent")) return "⚡";
  if (c.includes("spring")) return "🌸";
  if (c.includes("monsoon") || c.includes("rain")) return "🌧️";
  if (c.includes("winter") || c.includes("autumn") || c.includes("fall")) return "🍂";
  if (c.includes("summer")) return "☀️";
  return "📌";
}

function GroupNews() {
  const newsData = useContent(NEWS_QUERY, newsDataFallback);

  const totalItems = newsData.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="page">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="group-hero">
        <img
          src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1784918675/IMG-20241123-WA0055_n1o0s3.jpg"
          alt="Group News hero"
        />
        <div className="group-hero-veil" aria-hidden="true"></div>
        <div className="group-hero-title container">
          <p className="eyebrow">Updates &amp; Announcements</p>
          <h1 className="display">Group News</h1>
        </div>
      </header>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <div className="gn-stats-bar">
        <div className="container gn-stats-inner">
          <div className="gn-stat">
            <span className="gn-stat-num">{newsData.length}</span>
            <span className="gn-stat-label">Semesters</span>
          </div>
          <div className="gn-stat-div" aria-hidden="true" />
          <div className="gn-stat">
            <span className="gn-stat-num">{totalItems}</span>
            <span className="gn-stat-label">Updates</span>
          </div>
          <div className="gn-stat-div" aria-hidden="true" />
          <div className="gn-stat">
            <span className="gn-stat-num">🎓</span>
            <span className="gn-stat-label">Kapat Research Group</span>
          </div>
        </div>
      </div>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <div className="container gn-container">
        <div className="gn-timeline">
          {newsData.map((section, idx) => {
            const accent = ACCENTS[idx % ACCENTS.length];
            const icon = categoryIcon(section.category);
            return (
              <div className="gn-section" key={idx} data-reveal>
                {/* Timeline spine dot */}
                <div
                  className="gn-dot"
                  style={{ background: accent.dot, boxShadow: `0 0 0 6px ${accent.glow}` }}
                  aria-hidden="true"
                />

                <div className="gn-section-body">
                  {/* Category header */}
                  <div className="gn-category-header">
                    <span
                      className="gn-category-badge"
                      style={{ background: accent.badge, color: accent.text }}
                    >
                      <span className="gn-category-icon">{icon}</span>
                      {section.category}
                    </span>
                    <div
                      className="gn-header-line"
                      style={{ background: `linear-gradient(to right, ${accent.dot}, transparent)` }}
                    />
                  </div>

                  {/* News cards */}
                  <ul className="gn-cards">
                    {section.items.map((item, i) => (
                      <li className="gn-card" key={i} style={{ animationDelay: `${i * 80}ms` }}>
                        <span
                          className="gn-card-dot"
                          style={{ background: accent.dot }}
                          aria-hidden="true"
                        />
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* End cap */}
          <div className="gn-end-cap" aria-hidden="true">
            <span>✦</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupNews;
