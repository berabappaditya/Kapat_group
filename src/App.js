import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
//body components
import Home from "./components/Home";
import AboutPI from "./components/AboutPI";
import Research from "./components/Research";
import Publication from "./components/Publication";
import Group from "./components/Group";

import Facilities from "./components/Facilities";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Fades [data-reveal] elements in as they scroll into view. The
// html.reveal-ready gate means content stays visible if JS never runs.
// A MutationObserver catches elements that mount AFTER the initial scan
// (live CMS data swapping in) — without it they'd stay at opacity 0.
function RevealManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const observeWithin = (root) => {
      if (root.matches && root.matches("[data-reveal]:not(.is-visible)")) {
        io.observe(root);
      }
      if (root.querySelectorAll) {
        root
          .querySelectorAll("[data-reveal]:not(.is-visible)")
          .forEach((el) => io.observe(el));
      }
    };

    observeWithin(document.body);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) observeWithin(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
  return null;
}

// On the deployed site, /studio is served as static files (build/studio)
// before the SPA ever sees the URL — this route only runs on the CRA dev
// server, where it hands editors over to the local Studio instead.
function StudioRedirect() {
  const isDev = process.env.NODE_ENV === "development";
  useEffect(() => {
    if (isDev) {
      window.location.replace("http://localhost:3333/studio/");
    }
  }, [isDev]);
  if (isDev) return null;
  return (
    <div className="page container" style={{ paddingTop: "4rem" }}>
      <p>
        The Studio is served at <a href="/studio/">/studio/</a> on the
        deployed site.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <RevealManager />
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route exact path="/home" element={<Home />} />

          <Route path="/aboutPI" element={<AboutPI />} />

          <Route path="/research" element={<Research />} />

          <Route path="/publication" element={<Publication />} />

          <Route path="/group" element={<Group view="members" />} />
          <Route path="/group/gallery" element={<Group view="gallery" />} />
          <Route
            path="/groupImg"
            element={<Navigate to="/group/gallery" replace />}
          />

          <Route path="/facilities" element={<Facilities />} />
          <Route path="/studio" element={<StudioRedirect />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
