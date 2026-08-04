import React from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import home from "../content/home.json";
import site from "../content/site.json";
import newsData from "../content/news.json";
import { useContent } from "../lib/useContent";
import { flattenNews } from "../lib/newsOrder";

const QUICK_LINK_PATHS = ["/research", "/publication", "/group", "/facilities"];

const HERO_QUERY = `*[_id == "homePage"][0]{"lede": heroLede}`;
const NEWS_QUERY = `*[_type == "newsGroup"] | order(order asc){ category, items }`;
const POSITIONS_QUERY = `*[_id == "homePage"][0]{phd, postdoc, internship}`;

/* Feed sizing: the column runs as deep as the Open Positions panel beside it,
   so the item count is measured rather than fixed. */
const MAX_ITEMS = 16; // upper bound we ever put in the DOM to measure
const MIN_ITEMS = 3;
const STACKED_ITEMS = 5; // one-column layout has no panel to match
const STACK_QUERY = "(max-width: 900px)"; // mirrors the .home-cols breakpoint

/**
 * Number of news items that fit beside the Open Positions panel. Renders the
 * full candidate list, measures it against the panel's bottom edge, then trims
 * to the last item that clears it. Measuring in a layout effect means the trim
 * happens before the browser paints, so the long list is never visible.
 */
function useFittedCount(feedRef, panelRef, tailRef, total) {
  const [count, setCount] = React.useState(null);

  // null means "render everything and measure again"
  const remeasure = React.useCallback(() => setCount(null), []);

  React.useLayoutEffect(() => {
    remeasure();
  }, [total, remeasure]);

  React.useLayoutEffect(() => {
    if (count !== null) return;
    const feed = feedRef.current;
    const panel = panelRef.current;
    const tail = tailRef.current;
    if (!feed || !panel || !tail) return;

    if (window.matchMedia(STACK_QUERY).matches) {
      setCount(Math.min(STACKED_ITEMS, total));
      return;
    }

    // offsetTop/offsetHeight are layout positions, so the data-reveal
    // transform on either column can't skew them. Both elements resolve to
    // the same offsetParent here; rects are the fallback if that ever changes.
    const aligned = feed.offsetParent === panel.offsetParent &&
      feed.offsetParent === tail.offsetParent;
    const feedTop = aligned ? feed.offsetTop : feed.getBoundingClientRect().top;
    const feedBottom = aligned
      ? feed.offsetTop + feed.offsetHeight
      : feed.getBoundingClientRect().bottom;
    const panelBottom = aligned
      ? panel.offsetTop + panel.offsetHeight
      : panel.getBoundingClientRect().bottom;
    // The CTA sits under the feed; its height plus margin is unavailable space.
    const tailBottom = aligned
      ? tail.offsetTop + tail.offsetHeight
      : tail.getBoundingClientRect().bottom;
    const room = panelBottom - feedTop - (tailBottom - feedBottom);

    let used = 0;
    let fits = 0;
    for (const item of Array.from(feed.children)) {
      used += item.offsetHeight;
      if (used > room && fits > 0) break;
      fits += 1;
    }
    setCount(Math.max(MIN_ITEMS, Math.min(fits, total)));
  }, [count, total, feedRef, panelRef, tailRef]);

  React.useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    let live = true;
    const onChange = () => {
      if (live) remeasure();
    };
    const observer = new ResizeObserver(onChange);
    observer.observe(panel);
    window.addEventListener("resize", onChange);
    // Webfonts land after first paint and change every line height.
    if (document.fonts) document.fonts.ready.then(onChange);
    return () => {
      live = false;
      observer.disconnect();
      window.removeEventListener("resize", onChange);
    };
  }, [panelRef, remeasure]);

  return count === null ? total : count;
}

function Home() {
  const hero = useContent(HERO_QUERY, home.hero);
  const newsGroups = useContent(NEWS_QUERY, newsData);
  const openPositions = useContent(POSITIONS_QUERY, home.openPositions);
  const { phd, postdoc, internship } = openPositions;
  const quickLinks = site.nav.filter((item) =>
    QUICK_LINK_PATHS.includes(item.path)
  );

  // Newest semester first, flattened across semesters — the feed keeps going
  // into the previous one rather than stopping at a semester boundary.
  const news = React.useMemo(
    () => flattenNews(newsGroups).slice(0, MAX_ITEMS),
    [newsGroups]
  );

  const feedRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const tailRef = React.useRef(null);
  const visible = useFittedCount(feedRef, panelRef, tailRef, news.length);
  const shown = news.slice(0, visible);

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
            <span className="head-tag">Newest first</span>
          </div>

          <div className="hn-feed" ref={feedRef}>
            {shown.map((entry, index) => {
              const opensSemester =
                index === 0 || entry.category !== shown[index - 1].category;
              return (
                <article className="hn-item" key={`${entry.category}-${index}`}>
                  {opensSemester && entry.category && (
                    <p className="hn-when">{entry.category}</p>
                  )}
                  <div className="hn-line">
                    <span className="hn-dot" aria-hidden="true" />
                    <p>{entry.text}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="hn-cta-wrap" ref={tailRef}>
            <Link to="/group-news" className="hn-cta-btn">
              <span>View all news</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        <aside className="positions-wrap" data-reveal ref={panelRef}>
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
