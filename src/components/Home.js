import React from "react";
import Carousel from "./Carousel";
import { news } from "../Data/HomeData";

function Home() {
  return (
    <div className="home body">
      <div className="home-main body-child">
        <Carousel />
        <div
          className="home-news"
          style={{ padding: "15vh 0 3vh 4vw", margin: "10vh 0 0 0" }}
        >
          <div
            style={{
              marginLeft: "5px",
              marginBottom: "2vh",
              height: "5px",
              width: "210px",
              backgroundColor: "#008BFF",
              borderRadius: "1px",
            }}
          ></div>
          <h1 style={{ margin: "1vh 0 5vh 0" }}>Group News</h1>
          {news.map((item, index) => {
            return (
              <p
                key={index}
                style={{
                  marginLeft: "1vw",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                - {item.detail}.
              </p>
            );
          })}
        </div>
        <div
          className="home-open-position"
          style={{ padding: "10vh 4vw 3vh 4vw", margin: "10vh 0 0 0" }}
        >
          <div
            style={{
              marginLeft: "4px",
              marginBottom: "2vh",
              height: "5px",
              width: "250px",
              backgroundColor: "#008BFF",
              borderRadius: "1px",
            }}
          ></div>
          <h1 style={{ margin: "1vh 0 5vh 0" }}>Open Position</h1>
          <h4 style={{ margin: "5vh 0 5vh 1vw" }}>PhD Position:</h4>
          <p style={{ marginLeft: "2vw" }}>
            Currently, there are three opening for doctoral study in the area of
            asymmetric catalysis, cascade catalysis & metalloradical catalysis,
            interested candidates are requested to send their updated CV with
            short research summary directly to Dr. Ajoy Kapat (
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:ajoy.kapat@snu.edu.in"
            >
              ajoy.kapat@snu.edu.in
            </a>
            ).{" "}
          </p>
          <h4 style={{ margin: "5vh 0 5vh 1vw" }}>Post-Doc Position:</h4>
          <p style={{ marginLeft: "2vw" }}>
            Currently, no funded post-doctoral positions are available. However,
            group support with the research proposal and supporting letter to
            all the interested candidates, who are willing to apply for the
            following fellowships.
            <br />
            <br />
            I.National Post Doctoral Fellowship
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.serbonline.in/SERB/npdf?HomePage=New"
            >
              https://www.serbonline.in/SERB/npdf?HomePage=New
            </a>{" "}
            <br />
            <br />
            II. Research Associates (
            <a
              target="_blank"
              rel="noreferrer"
              href="https://csirhrdg.res.in/Home/Index/1/Default/2186/56"
            >
              https://csirhrdg.res.in/Home/Index/1/Default/2186/56
            </a>
            )
            <br />
            <br />
            All the eligible candidates are requested to send their updated CV,
            two letters of recommendation with short research summary directly
            to Dr. Ajoy Kapat (ajoy.kapat@snu.edu.in).
          </p>
        </div>
        <div className="home-short" style={{ padding: "2vh 4vw 3vh 4vw" }}>
          <h4 style={{ margin: "3vh 0 5vh 1vw" }}>
            Short Term Research Internship Position:
          </h4>
          <p style={{ marginLeft: "2vw" }}>
            Candidates are requested to send their updated CV directly to Dr.
            Ajoy Kapat (
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:ajoy.kapat@snu.edu.in"
            >
              ajoy.kapat@snu.edu.in
            </a>
            ).
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
