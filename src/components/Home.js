import React from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import home from "../content/home.json";
import site from "../content/site.json";
import newsData from "../content/news.json";
import { useContent } from "../lib/useContent";

const QUICK_LINK_PATHS = ["/research", "/publication", "/group", "/facilities"];

const HERO_QUERY = `*[_id == "homePage"][0]{"lede": heroLede}`;
const NEWS_QUERY = `*[_type == "newsGroup"] | order(order desc) { items }`;
const POSITIONS_QUERY = `*[_id == "homePage"][0]{phd, postdoc, internship}`;

function Home() {
  const hero = useContent(HERO_QUERY, home.hero);
  // Flatten news groups to get the latest flat items
  const rawNewsGroups = useContent(NEWS_QUERY, newsData);
  const news = rawNewsGroups.flatMap(group => group.items || []);
  const openPositions = useContent(POSITIONS_QUERY, home.openPositions);
  const { phd, postdoc, internship } = openPositions;
  const quickLinks = site.nav.filter((item) =>
    QUICK_LINK_PATHS.includes(item.path)
  );

  return (
    <div className="page">
      <section className="home-hero">
        <div className="home-hero-bg">
          <Carousel />
        </div>
        <div className="home-hero-scrim" aria-hidden="true"></div>
        <div className="container home-hero-inner">
          <div className="home-hero-text">
            <p className="eyebrow">{site.brand.subtitle}</p>
            <h1 className="display">{site.brand.title}</h1>
            <div className="tick-rule">
              <span className="tick"></span>
              <span className="line"></span>
            </div>
            <p className="hero-lede">{hero.lede}</p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="quick-strip" data-reveal>
          {quickLinks.map((item) => (
            <Link key={item.path} to={item.path} className="quick-card">
              <h3>{item.label}</h3>
              <span className="view-tag">View</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container home-cols">
        <div data-reveal>
          <div className="section-head">
            <h2>Group News</h2>
            <span className="head-tag">Latest</span>
          </div>

          <div className="hn-feed">
            {news.slice(0, 5).map((item, index) => (
              <div className="hn-item" key={index}>
                <span className="hn-num">0{index + 1}</span>
                <div className="hn-content">
                  <span className="hn-dot" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hn-cta-wrap">
            <Link to="/group-news" className="hn-cta-btn">
              <span>View all news</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        <aside className="positions-wrap" data-reveal>
          <div className="positions-panel">
            <h2>Open Positions</h2>

            <h3>{phd.heading}</h3>
            <p>
              {phd.text} (
              <a href={`mailto:${phd.email}`}>{phd.email}</a>
              ).
            </p>

            <h3>{postdoc.heading}</h3>
            <p>{postdoc.intro}</p>
            <ul className="fellowship-list">
              {postdoc.fellowships.map((fellowship) => (
                <li key={fellowship.url}>
                  {fellowship.label} —{" "}
                  <a target="_blank" rel="noreferrer" href={fellowship.url}>
                    apply here
                  </a>
                </li>
              ))}
            </ul>
            <p>{postdoc.closing}</p>

            <h3>{internship.heading}</h3>
            <p>
              {internship.text} (
              <a href={`mailto:${internship.email}`}>{internship.email}</a>
              ).
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Home;
