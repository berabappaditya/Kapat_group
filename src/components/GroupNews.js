import React from "react";
import newsDataFallback from "../content/news.json";
import { useContent } from "../lib/useContent";
import { countItems, groupByYear, sortNewsGroups } from "../lib/newsOrder";

const NEWS_QUERY = `*[_type == "newsGroup"] | order(order asc){ category, items }`;

const anchorFor = (year) => (year ? `gn-${year}` : "gn-earlier");

/** Height of the sticky site nav, so this page's own sticky bits clear it. */
function useNavOffset() {
  const [offset, setOffset] = React.useState(72);
  React.useLayoutEffect(() => {
    const nav = document.querySelector(".site-nav");
    if (!nav) return undefined;
    const measure = () => setOffset(nav.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);
  return offset;
}

/** Which year block is under the jump bar right now. */
function useActiveYear(navOffset, yearCount) {
  const [active, setActive] = React.useState(null);
  React.useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".gn-year"));
    if (!sections.length) return undefined;
    const onScreen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onScreen.add(entry.target.id);
          else onScreen.delete(entry.target.id);
        });
        const topmost = sections.find((section) => onScreen.has(section.id));
        if (topmost) setActive(topmost.id);
      },
      { rootMargin: `-${navOffset + 90}px 0px -55% 0px` }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navOffset, yearCount]);
  return active;
}

function GroupNews() {
  const newsGroups = useContent(NEWS_QUERY, newsDataFallback);
  const navOffset = useNavOffset();

  const ordered = React.useMemo(() => sortNewsGroups(newsGroups), [newsGroups]);
  const years = React.useMemo(() => groupByYear(newsGroups), [newsGroups]);
  const activeYear = useActiveYear(navOffset, years.length);

  const totalItems = countItems(newsGroups);
  const dated = ordered.filter((group) => group.semester);
  const latestCategory = ordered.length ? ordered[0].category : null;
  // Oldest *dated* semester — ordered[last] would be the undated legacy group.
  const earliest = dated.length ? dated[dated.length - 1] : null;
  const span = earliest
    ? `${earliest.semester.year}–${dated[0].semester.year}`
    : null;

  const jumpTo = (event, anchor) => {
    const target = document.getElementById(anchor);
    if (!target) return;
    event.preventDefault();
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  };

  return (
    <div className="page gn-page" style={{ "--gn-nav": `${navOffset}px` }}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="group-hero">
        <img
          src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1784918675/IMG-20241123-WA0055_n1o0s3.jpg"
          alt="Group News hero"
        />
        <div className="group-hero-veil" aria-hidden="true"></div>
        <div className="group-hero-title container">
          <p className="eyebrow">{span ? `Archive ${span}` : "Archive"}</p>
          <h1 className="display">Group News</h1>
        </div>
      </header>

      {/* ── Year rail ────────────────────────────────────────────── */}
      <nav className="gn-jump" aria-label="Jump to year">
        <div className="container gn-jump-inner">
          <span className="gn-jump-label">Year</span>
          <div className="gn-jump-years">
            {years.map(({ year }) => {
              const anchor = anchorFor(year);
              return (
                <a
                  key={anchor}
                  href={`#${anchor}`}
                  className={`gn-jump-year${activeYear === anchor ? " on" : ""}`}
                  onClick={(event) => jumpTo(event, anchor)}
                  aria-current={activeYear === anchor ? "true" : undefined}
                >
                  {year || "Earlier"}
                </a>
              );
            })}
          </div>
          <span className="gn-jump-count">
            {totalItems} updates · {dated.length || ordered.length} semesters
          </span>
        </div>
      </nav>

      {/* ── Archive ──────────────────────────────────────────────── */}
      <div className="container gn-wrap">
        {years.map(({ year, groups }) => (
          <section className="gn-year" id={anchorFor(year)} key={anchorFor(year)}>
            <div className="gn-year-rail">
              <span className={`gn-year-num${year ? "" : " alt"}`}>
                {year || "Earlier"}
              </span>
              <span className="gn-year-tick" aria-hidden="true" />
              <span className="gn-year-meta">
                {countItems(groups)} update{countItems(groups) === 1 ? "" : "s"}
              </span>
            </div>

            <div className="gn-year-body" data-reveal>
              {groups.map((group) => {
                const isLatest = group.category === latestCategory;
                const title = group.semester && group.semester.season
                  ? `${group.semester.season} Semester`
                  : group.category;
                return (
                  <article
                    className={`gn-sem${isLatest ? " latest" : ""}`}
                    key={group.category}
                  >
                    <header className="gn-sem-head">
                      <h2 className="gn-sem-title">{title}</h2>
                      {isLatest && <span className="gn-sem-flag">Latest</span>}
                      <span className="gn-sem-rule" aria-hidden="true" />
                      <span className="gn-sem-count">
                        {(group.items || []).length}
                      </span>
                    </header>

                    <ul className="gn-list">
                      {(group.items || []).map((item, index) => (
                        <li className="gn-entry" key={index}>
                          <span className="gn-entry-mark" aria-hidden="true" />
                          <p>{item}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {earliest && (
          <p className="gn-foot">
            <span className="gn-foot-rule" aria-hidden="true" />
            Archive begins · {earliest.category}
          </p>
        )}
      </div>
    </div>
  );
}

export default GroupNews;
