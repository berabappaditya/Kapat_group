import React, { useMemo, useState } from "react";
import publications from "../content/publications.json";
import { useContent } from "../lib/useContent";
import { SearchIcon, ChevronDownIcon } from "./Icons";

const PUBLICATIONS_QUERY = `*[_type == "publication"] | order(order asc){
  title, authors, journal, year,
  "volume": coalesce(volume, ""),
  "pages": coalesce(pages, ""),
  "url": coalesce(url, "")
}`;

// Bolds every occurrence of the PI's name inside an author string.
function renderAuthors(authors) {
  return authors
    .split(/(A\. Kapat)/g)
    .map((part, index) =>
      part === "A. Kapat" ? <b key={index}>{part}</b> : part
    );
}

function Publication() {
  const { sectionTitle } = publications;
  const items = useContent(PUBLICATIONS_QUERY, publications.items);
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");

  const years = useMemo(
    () => [...new Set(items.map((item) => item.year))],
    [items]
  );

  // Numbering stays stable (newest = highest) no matter what is filtered.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .map((item, index) => ({ ...item, number: items.length - index }))
      .filter((item) => {
        if (year !== "all" && item.year !== year) return false;
        if (!q) return true;
        return `${item.title} ${item.authors} ${item.journal}`
          .toLowerCase()
          .includes(q);
      });
  }, [items, year, query]);

  return (
    <div className="page">
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">{sectionTitle}</p>
          <h1 className="display">Publications</h1>
        </div>
      </header>

      <div className="container">
        <div className="pub-filter" data-reveal>
          <div className="pf-badge" aria-hidden="true">
            <SearchIcon />
          </div>
          <label className="pf-year">
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              aria-label="Filter publications by year"
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pf-chevron" />
          </label>
          <label className="pf-search">
            <input
              type="search"
              value={query}
              placeholder="Search title, author or journal…"
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search publications"
            />
            <SearchIcon className="pf-search-icon" />
          </label>
          <span className="pf-count">
            {filtered.length} {filtered.length === 1 ? "paper" : "papers"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="pub-empty">
            No publications match — try another year or search term.
          </p>
        ) : (
          <div className="timeline">
            {filtered.map((item, index) => {
              const showYear =
                index === 0 || filtered[index - 1].year !== item.year;
              const side = index % 2 === 0 ? "left" : "right";
              return (
                <React.Fragment key={`${item.year}-${item.number}`}>
                  {showYear && (
                    <div className="tl-year">
                      <span>{item.year}</span>
                    </div>
                  )}
                  <div
                    className={`tl-item ${side}`}
                    style={{ animationDelay: `${Math.min(index * 60, 420)}ms` }}
                  >
                    <span className="tl-branch" aria-hidden="true"></span>
                    <article className="pub-card">
                      <header className="pub-ribbon">
                        <span className="pub-index">{item.number}.</span>
                        <span>
                          <i>{item.journal}</i> {item.year}
                          {item.volume && <>, {item.volume}</>}
                          {item.pages && <>, {item.pages}</>}.
                        </span>
                      </header>
                      <div className="pub-body">
                        <h3>“{item.title}”</h3>
                        <p className="pub-authors">
                          {renderAuthors(item.authors)}
                          {item.url && (
                            <>
                              {" — "}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href={item.url}
                              >
                                Link
                              </a>
                            </>
                          )}
                        </p>
                      </div>
                    </article>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Publication;
