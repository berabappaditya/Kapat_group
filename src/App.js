import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
//body components
import Home from "./components/Home";
import AboutPI from "./components/AboutPI";
import Research from "./components/Research";
import Publication from "./components/Publication";
import Group from "./components/Group";
import GroupGallery from "./components/GroupGallery";
import Facilities from "./components/Facilities";
import GroupImg from "./components/GroupImg";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route exact path="/home" element={<Home />} />

          <Route path="/aboutPI" element={<AboutPI />} />

          <Route path="/research" element={<Research />} />

          <Route path="/publication" element={<Publication />} />

          <Route path="/group" element={<Group />} />
          <Route path="/groupImg" element={<GroupImg />} />

          <Route path="/groupGallery" element={<GroupGallery />} />

          <Route path="/facilities" element={<Facilities />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
