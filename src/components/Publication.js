import React, { useMemo, useState } from "react";
import publications from "../content/publications.json";
import patentsFallback from "../content/patents.json";
import { useContent } from "../lib/useContent";
import { SearchIcon, ChevronDownIcon } from "./Icons";

const PUBLICATIONS_QUERY = `*[_type == "publication"] | order(order asc){
  title, authors,
  "journal": coalesce(journal, ""),
  "year": coalesce(year, ""),
  "volume": coalesce(volume, ""),
  "pages": coalesce(pages, ""),
  "url": coalesce(url, ""),
  "status": coalesce(status, ""),
  "coverImg": coalesce(coverUrl, ""),
  "graphicImg": coalesce(graphicUrl, ""),
  "note": coalesce(note, "")
}`;

const PATENTS_QUERY = `*[_type == "patent"] | order(order asc){
  title, authors, milestones, "img": coalesce(imageUrl, "")
}`;

const SECTIONS = [
  { id: "papers", label: "Publications" },
  { id: "patents", label: "Patents" },
];

// Bolds every occurrence of the PI's name inside an author string.
function renderAuthors(authors) {
  return authors
    .split(/(Ajoy Kapat|A\. Kapat)/g)
    .map((part, index) =>
      part === "A. Kapat" || part === "Ajoy Kapat" ? (
        <b key={index}>{part}</b>
      ) : (
        part
      )
    );
}

/* Unpublished work is grouped under this label instead of a year */
const SUBMITTED = "Submitted";
const groupOf = (item) => item.year || SUBMITTED;

function PublicationCard({ item }) {
  return (
    <article className={`pb-card${item.coverImg ? "" : " no-cover"}`}>
      {item.coverImg && (
        <div className="pb-cover">
          <img src={item.coverImg} alt="" loading="lazy" />
        </div>
      )}

      <div className="pb-main">
        <div className="pb-head">
          <span className="pb-num">{item.number}</span>
          {item.status ? (
            <span className="pb-status">{item.status}</span>
          ) : (
            <span className="pb-cite">
              <i>{item.journal}</i> {item.year}
              {item.volume && <>, {item.volume}</>}
              {item.pages && <>, {item.pages}</>}.
            </span>
          )}
        </div>

        <h3 className="pb-title">{item.title}</h3>
        <p className="pb-authors">{renderAuthors(item.authors)}</p>

        {item.url && (
          <a
            className="pb-doi"
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            View publication
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}

        {item.graphicImg && (
          <figure className="pb-graphic">
            <img
              src={item.graphicImg}
              alt={`Graphical abstract — ${item.title}`}
              loading="lazy"
            />
          </figure>
        )}

        {item.note && <p className="pb-note">{item.note}</p>}
      </div>
    </article>
  );
}

function Publication() {
  const { sectionTitle } = publications;
  const items = useContent(PUBLICATIONS_QUERY, publications.items);
  const patents = useContent(PATENTS_QUERY, patentsFallback);
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");

  // Submitted work has no year, so it never reaches the dropdown.
  const years = useMemo(
    () => [...new Set(items.map((item) => item.year).filter(Boolean))],
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
      <header className="group-hero">
        <img src="https://res.cloudinary.com/ajoy-kapat/image/upload/fl_preserve_transparency/v1784918525/SNIoE-Library_xok3xo.jpg" alt="Publications" />
        <div className="group-hero-veil" aria-hidden="true"></div>
        <div className="group-hero-title container">
          <p className="eyebrow">{sectionTitle}</p>
          <h1 className="display">Publications</h1>
        </div>
      </header>

      <nav className="rs-jump" aria-label="Publication sections">
        <div className="container rs-jump-inner">
          {SECTIONS.map((section) => (
            <a key={section.id} className="rs-jump-link" href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="container">
        {/* ==================================================== Papers */}
        <section className="rs-section">
          <header className="rs-head" id="papers" data-reveal>
            <p className="eyebrow">Peer-reviewed</p>
            <h2 className="rs-title">Publications</h2>
          </header>

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
            <div className="pb-list">
              {filtered.map((item, index) => {
                const group = groupOf(item);
                const opensGroup =
                  index === 0 || groupOf(filtered[index - 1]) !== group;
                return (
                  <React.Fragment key={`${group}-${item.number}`}>
                    {opensGroup && (
                      <div className="pb-year" data-reveal>
                        <span>{group}</span>
                      </div>
                    )}
                    <div data-reveal>
                      <PublicationCard item={item} />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </section>

        {/* ==================================================== Patents */}
        <section className="rs-section">
          <header className="rs-head" id="patents" data-reveal>
            <p className="eyebrow">Intellectual property</p>
            <h2 className="rs-title">Patents</h2>
          </header>

          <div className="pt-list">
            {patents.map((patent, index) => (
              <article className="pt-card" key={patent.title} data-reveal>
                {patent.img && (
                  <div className="pt-cert">
                    <img src={patent.img} alt="" loading="lazy" />
                  </div>
                )}

                <div className="pt-main">
                  <span className="pt-num">
                    Patent {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="pt-title">{patent.title}</h3>
                  <p className="pt-authors">{renderAuthors(patent.authors)}</p>

                  <ul className="pt-steps">
                    {patent.milestones.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Publication;
