import React from "react";
import piFallback from "../content/about-pi.json";
import { useContent } from "../lib/useContent";

const PI_QUERY = `*[_id == "aboutPi"][0]{
  name, "photo": photoUrl, bio, education, experience, recognition, editorial, invitedTalks
}`;

function AboutPI() {
  const pi = useContent(PI_QUERY, piFallback);
  return (
    <div className="page">
      <header className="pi-hero">
        <div className="container pi-hero-inner">
          <div className="pi-hero-text">
            <p className="eyebrow">Principal Investigator</p>
            <h1 className="display">{pi.name}</h1>
            <div className="tick-rule">
              <span className="tick"></span>
              <span className="line"></span>
            </div>
            {pi.bio.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          <figure className="pi-portrait">
            <img src={pi.photo} alt={pi.name} />
          </figure>
        </div>
      </header>

      <div className="container">
        <div className="section-head" data-reveal>
          <h2>Education</h2>
        </div>
        <ul className="detail-rows" data-reveal>
          {pi.education.map((edu, index) => (
            <li key={index}>
              <span className="detail-key">{edu.date}</span>
              <span>{edu.detail}</span>
            </li>
          ))}
        </ul>

        <div className="section-head" data-reveal>
          <h2>Professional Experience</h2>
        </div>
        <ul className="detail-rows" data-reveal>
          {pi.experience.map((exp, index) => (
            <li key={index}>
              <span className="detail-key">{exp.period}</span>
              <span>{exp.position}</span>
            </li>
          ))}
        </ul>

        <div className="section-head" data-reveal>
          <h2>National &amp; International Recognition</h2>
        </div>
        <ul className="split-rows" data-reveal>
          {pi.recognition.map((item, index) => (
            <li key={index}>
              <span>{item.title}</span>
              <span className="row-year">{item.year}</span>
            </li>
          ))}
        </ul>

        {pi.editorial && pi.editorial.length > 0 && (
          <>
            <div className="section-head" data-reveal>
              <h2>Editorial Appointments &amp; Review Activities</h2>
            </div>
            <ul className="split-rows" data-reveal>
              {pi.editorial.map((item, index) => (
                <li key={index}>
                  <span>{item.title}</span>
                  <span className="row-year">{item.year}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {pi.invitedTalks && pi.invitedTalks.length > 0 && (
          <>
            <div className="section-head" data-reveal>
              <h2>Invited Talks &amp; Conference Participation</h2>
            </div>
            <ul className="split-rows" data-reveal>
              {pi.invitedTalks.map((item, index) => (
                <li key={index}>
                  <span>{item.title}</span>
                  <span className="row-year">{item.date}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default AboutPI;
