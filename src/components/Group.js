import React from "react";
import { NavLink } from "react-router-dom";
import group from "../content/group.json";
import { useContent } from "../lib/useContent";

const MEMBERS_QUERY = `*[_type == "member"] | order(order asc){
  name, "details": bio, "img": photoUrl
}`;

const PHOTOS_QUERY = `*[_type == "groupPhoto"] | order(order asc){
  caption, "img": imageUrl
}`;

const tabClass = ({ isActive }) =>
  isActive ? "group-tab active" : "group-tab";

function Group({ view = "members" }) {
  const members = useContent(MEMBERS_QUERY, group.members);
  const photos = useContent(PHOTOS_QUERY, group.photos);
  const [zoomedIndex, setZoomedIndex] = React.useState(null);

  const displayPhotos = React.useMemo(() => [...photos].reverse(), [photos]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (zoomedIndex === null) return;
      if (e.key === 'Escape') {
        setZoomedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setZoomedIndex((zoomedIndex - 1 + displayPhotos.length) % displayPhotos.length);
      } else if (e.key === 'ArrowRight') {
        setZoomedIndex((zoomedIndex + 1) % displayPhotos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedIndex, displayPhotos.length]);

  const MEMBER_HERO = "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784918675/IMG-20241123-WA0055_n1o0s3.jpg";
  const GALLERY_HERO = "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784919095/20260513_192834_qcvzph.jpg";
  const heroBg = view === "members" ? MEMBER_HERO : GALLERY_HERO;

  return (
    <div className="page">
      <header className="group-hero">
        <img src={heroBg} alt={`${view} hero`} />
        <div className="group-hero-veil" aria-hidden="true"></div>
        <div className="group-hero-title container">
          <p className="eyebrow">People</p>
          <h1 className="display">The Group</h1>
        </div>
      </header>

      <nav className="group-tabs" aria-label="Group sections">
        <div className="container group-tabs-inner">
          <NavLink end to="/group" className={tabClass}>
            Members
          </NavLink>
          <span className="tab-sep" aria-hidden="true"></span>
          <NavLink to="/group/gallery" className={tabClass}>
            Gallery
          </NavLink>
        </div>
      </nav>

      <div className="container">
        {view === "members" ? (
          <>
            <div className="section-head" data-reveal>
              <h2>Current Members</h2>
              <span className="head-tag">
                {members.length} {members.length === 1 ? "person" : "people"}
              </span>
            </div>
            <div className="member-grid">
              {members.map((member) => (
                <article className="member-card" key={member.name} data-reveal>
                  <img
                    className="member-photo"
                    src={member.img}
                    alt={member.name}
                  />
                  <h3>{member.name}</h3>
                  <p>{member.details}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="section-head" data-reveal>
              <h2>Group Photos</h2>
              <span className="head-tag">
                {photos.length} {photos.length === 1 ? "photo" : "photos"}
              </span>
            </div>
            <div className="gallery-grid">
              {displayPhotos.map((photo, idx) => (
                <figure key={photo.img} data-reveal onClick={() => setZoomedIndex(idx)} className="gallery-figure">
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
          </>
        )}
      </div>

      {zoomedIndex !== null && (
        <div className="photo-modal" onClick={() => setZoomedIndex(null)}>
          <button 
            className="modal-nav prev" 
            onClick={(e) => { e.stopPropagation(); setZoomedIndex((zoomedIndex - 1 + displayPhotos.length) % displayPhotos.length); }}
            aria-label="Previous photo"
          >
            &#10094;
          </button>

          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="photo-modal-close" onClick={() => setZoomedIndex(null)} aria-label="Close modal">
              &times;
            </button>
            <img src={displayPhotos[zoomedIndex].img} alt={displayPhotos[zoomedIndex].caption || "Group photo"} />
            {displayPhotos[zoomedIndex].caption && <p className="photo-modal-caption">{displayPhotos[zoomedIndex].caption}</p>}
          </div>

          <button 
            className="modal-nav next" 
            onClick={(e) => { e.stopPropagation(); setZoomedIndex((zoomedIndex + 1) % displayPhotos.length); }}
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
