import React from "react";
import researchFallback from "../content/research.json";
import teaching from "../content/teaching.json";
import outreach from "../content/outreach.json";
import { useContent } from "../lib/useContent";

const RESEARCH_QUERY = `*[_type == "researchArea"] | order(order asc){
  title, details, "img": imageUrl
}`;

/* In-page jump targets, in render order */
const SECTIONS = [
  { id: "research-interest", label: "Research Interest" },
  { id: "teaching", label: "Teaching" },
  { id: "public-outreach", label: "Public Outreach" },
];

function SectionHead({ id, eyebrow, title }) {
  return (
    <header className="rs-head" id={id} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="rs-title">{title}</h2>
    </header>
  );
}

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

      {/* Jump strip */}
      <nav className="rs-jump" aria-label="Research sections">
        <div className="container rs-jump-inner">
          {SECTIONS.map((section) => (
            <a key={section.id} className="rs-jump-link" href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="container">
        {/* ============================================ i) Research Interest */}
        <section className="rs-section">
          <SectionHead
            id="research-interest"
            eyebrow="i — Our programme"
            title="Research Interest"
          />

          {research.map((item, index) => (
            <section className="research-item" key={index} data-reveal>
              <div>
                <h3>{item.title}</h3>
                <p>{item.details}</p>
              </div>
              <div className="research-media">
                <img src={item.img} alt={item.title} />
              </div>
            </section>
          ))}
        </section>

        {/* ======================================================= ii) Teaching */}
        <section className="rs-section">
          <SectionHead
            id="teaching"
            eyebrow="ii — In the classroom"
            title="Teaching"
          />

          <div className="tc-groups">
            {teaching.groups.map((group) => (
              <section className="tc-group" key={group.level} data-reveal>
                <div className="tc-group-head">
                  <h3 className="tc-group-title">{group.level}</h3>
                  <span className="tc-group-count">{group.courses.length}</span>
                </div>

                <ul className="tc-list">
                  {group.courses.map((course) => (
                    <li className="tc-course" key={course.name}>
                      <span className="tc-code">{course.code || "—"}</span>
                      <span className="tc-name">
                        {course.name}
                        {course.kind && (
                          <span className="tc-kind">{course.kind}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <aside className="tc-role" data-reveal>
            <p className="tc-role-label">{teaching.coordinator.role}</p>
            <ul className="tc-role-list">
              {teaching.coordinator.programmes.map((programme) => (
                <li key={programme}>{programme}</li>
              ))}
            </ul>
          </aside>
        </section>

        {/* ================================================ iii) Public Outreach */}
        <section className="rs-section">
          <SectionHead
            id="public-outreach"
            eyebrow="iii — Beyond the lab"
            title="Public Outreach"
          />

          <div className="po-events">
            {outreach.map((event) => (
              <article className="po-event" key={event.title} data-reveal>
                <div className="po-body">
                  <div className="po-meta">
                    <span className="po-place">{event.place}</span>
                    <span className="po-date">{event.date}</span>
                  </div>
                  <h3 className="po-title">{event.title}</h3>
                  {event.description && (
                    <p className="po-desc">{event.description}</p>
                  )}
                </div>

                {/* Figures keep their native proportions: flex-grow tracks the
                    aspect ratio, so every image in a row lands the same height
                    and nothing is cropped. */}
                <div className="po-figs">
                  {event.images.map((image) => {
                    const inner = (
                      <>
                        <img
                          src={image.img}
                          alt={
                            image.label
                              ? `${image.label} — ${event.title}`
                              : event.title
                          }
                          loading="lazy"
                        />
                        {image.label && (
                          <span className="po-fig-label">
                            {image.label}
                            {image.link && (
                              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M6 3h7v7M13 3L4 12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </span>
                        )}
                      </>
                    );

                    return (
                      <figure
                        className="po-fig"
                        key={image.img}
                        style={{ "--ar": image.w / image.h }}
                      >
                        {image.link ? (
                          <a
                            className="po-fig-link"
                            href={image.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {inner}
                          </a>
                        ) : (
                          inner
                        )}
                      </figure>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Research;
