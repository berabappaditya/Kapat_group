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

  // The newest group photo fronts the page
  const heroPhoto = photos[photos.length - 1];

  return (
    <div className="page">
      {heroPhoto ? (
        <header className="group-hero">
          <img src={heroPhoto.img} alt={heroPhoto.caption} />
          <div className="group-hero-veil" aria-hidden="true"></div>
          <div className="group-hero-title container">
            <p className="eyebrow">People</p>
            <h1 className="display">The Group</h1>
          </div>
        </header>
      ) : (
        <header className="page-head">
          <div className="container">
            <p className="eyebrow">People</p>
            <h1 className="display">The Group</h1>
          </div>
        </header>
      )}

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
              {[...photos].reverse().map((photo) => (
                <figure key={photo.img} data-reveal>
                  <img src={photo.img} alt={photo.caption || "Group photo"} />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Group;
