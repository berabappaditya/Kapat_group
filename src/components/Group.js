import React from "react";
import { NavLink } from "react-router-dom";
import group from "../content/group.json";
import { useContent } from "../lib/useContent";

/* --------------------------------------------------------------------------
   Sanity queries — fetch all member fields including new categorisation
-------------------------------------------------------------------------- */
const MEMBERS_QUERY = `*[_type == "member"] | order(order asc){
  name,
  category,
  role,
  joinYear,
  tenurePeriod,
  "details": bio,
  "img": photoUrl,
  currentPosition,
  internship
}`;

const PHOTOS_QUERY = `*[_type == "groupPhoto"] | order(order asc){
  caption, "img": imageUrl
}`;

/* --------------------------------------------------------------------------
   Helpers
-------------------------------------------------------------------------- */
const tabClass = ({ isActive }) => (isActive ? "group-tab active" : "group-tab");

/** Generate 1-2 initials from a name */
function initials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "?";
  // Skip "Dr." prefix
  const filtered = parts.filter((p) => !p.match(/^(Dr|Mr|Ms|Mrs|Prof)\.?$/i));
  if (filtered.length >= 2)
    return (filtered[0][0] + filtered[filtered.length - 1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
}

/** Cycle through 5 gradient classes a–e */
const gradClasses = ["a", "b", "c", "d", "e"];
function gradClass(idx) {
  return gradClasses[idx % gradClasses.length];
}

/* --------------------------------------------------------------------------
   Section config — defines the sections shown in the Members tab
-------------------------------------------------------------------------- */
const SECTIONS = [
  {
    key: "graduate",
    label: "Graduate Students",
    filterTag: "current",
  },
  {
    key: "undergraduate",
    label: "Undergraduate Students",
    filterTag: "current",
  },
  {
    key: "former-msc",
    label: "Former M.Sc. Students",
    filterTag: "alumni",
  },
  {
    key: "former-undergrad",
    label: "Former Undergraduate Students",
    filterTag: "alumni",
  },
  {
    key: "former-postdoc",
    label: "Former Postdoctoral Fellows",
    filterTag: "alumni",
  },
  {
    key: "former-jrf",
    label: "Former Junior Research Fellows",
    filterTag: "alumni",
  },
  {
    key: "former-summer",
    label: "Former Summer Research Fellows",
    filterTag: "alumni",
  },
];

/* --------------------------------------------------------------------------
   MemberCard — premium card design referencing members-page_final.html
-------------------------------------------------------------------------- */
function MemberCard({ member, globalIdx, filterActive }) {
  const [open, setOpen] = React.useState(false);
  const isFormer = member.category?.startsWith("former-");
  const tagLabel = isFormer ? "Alumni" : "Current";
  const tagClass = isFormer ? "mg-tag alumni" : "mg-tag current";

  const hasBio = !!member.details;
  const bio = member.details || "";
  const hasPath =
    member.currentPosition || member.internship || member.tenurePeriod || member.joinYear;

  // hidden by filter
  if (
    filterActive !== "all" &&
    filterActive !== (isFormer ? "alumni" : "current")
  ) {
    return null;
  }

  return (
    <article
      className={`mg-card${open ? " open" : ""}`}
      style={{ "--d": `${(globalIdx % 4) * 0.09}s` }}
    >
      {/* Top gradient accent bar */}
      <div className="mg-card-accent" aria-hidden="true" />

      {/* Header row: avatar + name block */}
      <div className="mg-head">
        <div className="mg-avatar">
          <div className="mg-avatar-ring">
            {member.img ? (
              <img src={member.img} alt={member.name} className="mg-avatar-img" />
            ) : (
              <div className={`mg-ph mg-ph-${gradClass(globalIdx)}`}>
                {initials(member.name)}
              </div>
            )}
          </div>
        </div>

        <div className="mg-id">
          <h3 className="mg-name">{member.name}</h3>
          {member.role && <div className="mg-sub">{member.role}</div>}
          <div className="mg-tags">
            <span className={tagClass}>{tagLabel}</span>
            {(member.joinYear || member.tenurePeriod) && (
              <span className="mg-tag year">
                {member.tenurePeriod || member.joinYear}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {hasBio && (
        <>
          <p className="mg-bio">{bio}</p>
          {bio.length > 240 && (
            <button
              className="mg-more"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
            >
              {open ? "Show less " : "Read more "}
              <span className="mg-chev">▾</span>
            </button>
          )}
        </>
      )}

      {/* Trajectory path */}
      {hasPath && (
        <div className="mg-path">
          {member.internship && (
            <div className="mg-leg">
              <div>
                <div className="mg-leg-k">Internship</div>
                <div className="mg-leg-v">{member.internship}</div>
              </div>
            </div>
          )}
          {member.joinYear && !isFormer && (
            <div className="mg-leg">
              <div>
                <div className="mg-leg-k">Joined</div>
                <div className="mg-leg-v">{member.joinYear}</div>
              </div>
            </div>
          )}
          {member.tenurePeriod && isFormer && (
            <div className="mg-leg">
              <div>
                <div className="mg-leg-k">Tenure</div>
                <div className="mg-leg-v">{member.tenurePeriod}</div>
              </div>
            </div>
          )}
          {member.currentPosition && (
            <div className="mg-leg now">
              <div>
                <div className="mg-leg-k">Current Position</div>
                <div className="mg-leg-v">{member.currentPosition}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

/* --------------------------------------------------------------------------
   Group page
-------------------------------------------------------------------------- */
function Group({ view = "members" }) {
  const members = useContent(MEMBERS_QUERY, group.members);
  const photos = useContent(PHOTOS_QUERY, group.photos);
  const [zoomedIndex, setZoomedIndex] = React.useState(null);
  const [filter, setFilter] = React.useState("all");

  // Reset state when switching tabs
  React.useEffect(() => {
    setZoomedIndex(null);
    setFilter("all");
  }, [view]);

  const displayPhotos = React.useMemo(() => [...photos].reverse(), [photos]);

  // Keyboard nav for photo modal
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (zoomedIndex === null) return;
      if (e.key === "Escape") setZoomedIndex(null);
      else if (e.key === "ArrowLeft")
        setZoomedIndex((i) => (i - 1 + displayPhotos.length) % displayPhotos.length);
      else if (e.key === "ArrowRight")
        setZoomedIndex((i) => (i + 1) % displayPhotos.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomedIndex, displayPhotos.length]);

  // Intersect-observer reveal for member cards
  const gridRef = React.useRef(null);
  React.useEffect(() => {
    if (!gridRef.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("vis")),
      { threshold: 0.08 }
    );
    const cards = gridRef.current.querySelectorAll(".mg-card");
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [members, filter]);

  const MEMBER_HERO =
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784918675/IMG-20241123-WA0055_n1o0s3.jpg";
  const GALLERY_HERO =
    "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784919095/20260513_192834_qcvzph.jpg";
  const heroBg = view === "members" ? MEMBER_HERO : GALLERY_HERO;

  // Count visible members per filter
  const currentCount = members.filter((m) => !m.category?.startsWith("former-")).length;
  const alumniCount = members.filter((m) => m.category?.startsWith("former-")).length;
  const visibleCount =
    filter === "all"
      ? members.length
      : filter === "current"
      ? currentCount
      : alumniCount;

  return (
    <div className="page">
      {/* ---------------------------------------------------------------- Hero — matches site-wide pattern */}
      <header className="group-hero">
        <img src={heroBg} alt={`${view} hero`} />
        <div className="group-hero-veil" aria-hidden="true"></div>
        <div className="group-hero-title container">
          <p className="eyebrow">People</p>
          <h1 className="display">
            {view === "members" ? "The Group" : "Gallery"}
          </h1>
        </div>
      </header>

      {/* ---------------------------------------------------------------- Tab nav */}
      <nav className="group-tabs" aria-label="Group sections">
        <div className="container group-tabs-inner">
          <NavLink end to="/group" className={tabClass}>
            Members
          </NavLink>
          <span className="tab-sep" aria-hidden="true" />
          <NavLink to="/group/gallery" className={tabClass}>
            Gallery
          </NavLink>
        </div>
      </nav>

      {/* ================================================================ MEMBERS view */}
      {view === "members" && (
        <div className="container" key="members">
          {/* Filter bar */}
          <div className="mg-filter-bar" role="tablist" aria-label="Filter members">
            {[
              { id: "all", label: "All", count: members.length },
              { id: "current", label: "Current", count: currentCount },
              { id: "alumni", label: "Alumni", count: alumniCount },
            ].map(({ id, label, count }) => (
              <button
                key={id}
                className={`mg-filter-btn${filter === id ? " on" : ""}`}
                onClick={() => setFilter(id)}
                role="tab"
                aria-selected={filter === id}
              >
                {label}
              </button>
            ))}
            <span className="mg-filter-count">
              {visibleCount} member{visibleCount !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Sections */}
          <div ref={gridRef}>
            {(() => {
              // Build a flat index map for gradient cycling across all sections
              let runningIdx = 0;
              return SECTIONS.map((section) => {
                const sectionMembers = members.filter(
                  (m) => m.category === section.key
                );
                // Hide empty sections or filtered-out sections
                if (sectionMembers.length === 0) { runningIdx += 0; return null; }
                if (filter === "current" && section.filterTag !== "current") { runningIdx += sectionMembers.length; return null; }
                if (filter === "alumni" && section.filterTag !== "alumni") { runningIdx += sectionMembers.length; return null; }

                const startIdx = runningIdx;
                runningIdx += sectionMembers.length;

                return (
                  <section key={section.key} className="mg-section">
                    <div className="mg-section-head" data-reveal>
                      <h2 className="mg-section-title">{section.label}</h2>
                      <span className="mg-section-count">
                        {sectionMembers.length}
                      </span>
                    </div>

                    <div className="mg-grid">
                      {sectionMembers.map((member, i) => (
                        <MemberCard
                          key={member.name + i}
                          member={member}
                          globalIdx={startIdx + i}
                          filterActive={filter}
                        />
                      ))}
                    </div>
                  </section>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* ================================================================ GALLERY view */}
      {view === "gallery" && (
        <div className="container" key="gallery">
          <div className="section-head" data-reveal>
            <h2>Group Photos</h2>
            <span className="head-tag">
              {photos.length} {photos.length === 1 ? "photo" : "photos"}
            </span>
          </div>
          <div className="gallery-grid">
            {displayPhotos.map((photo, idx) => (
              <figure
                key={photo.img}
                data-reveal
                onClick={() => setZoomedIndex(idx)}
                className="gallery-figure"
              >
                <div className="gallery-img-wrapper">
                  <img src={photo.img} alt={photo.caption || "Group photo"} />
                  <div className="gallery-img-overlay">
                    <span>View</span>
                  </div>
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================ Photo modal */}
      {zoomedIndex !== null && (
        <div className="photo-modal" onClick={() => setZoomedIndex(null)}>
          <button
            className="modal-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedIndex(
                (zoomedIndex - 1 + displayPhotos.length) % displayPhotos.length
              );
            }}
            aria-label="Previous photo"
          >
            &#10094;
          </button>

          <div
            className="photo-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="photo-modal-close"
              onClick={() => setZoomedIndex(null)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={displayPhotos[zoomedIndex].img}
              alt={displayPhotos[zoomedIndex].caption || "Group photo"}
            />
            {displayPhotos[zoomedIndex].caption && (
              <p className="photo-modal-caption">
                {displayPhotos[zoomedIndex].caption}
              </p>
            )}
          </div>

          <button
            className="modal-nav next"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedIndex((zoomedIndex + 1) % displayPhotos.length);
            }}
            aria-label="Next photo"
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}

export default Group;
