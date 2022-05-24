import React from "react";
import Carousel from "./Carousel";
import { news } from "../Data/HomeData";
import { Link } from "react-router-dom";
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
                - {item.detail}
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
            <Link to={{ pathname: "ajoy.kapat@snu.edu.in" }} target="_blank">
              ajoy.kapat@snu.edu.in
            </Link>
            ).{" "}
          </p>
          <h4 style={{ margin: "5vh 0 5vh 1vw" }}>Post-Doc Position:</h4>
          <p style={{ marginLeft: "2vw" }}>
            Currently, no funded post-doctoral positions are available. However,
            group support with the research proposal and supporting letter to
            all the interested candidates, who are willing to apply for the
            following fellowships.
            <br />
            I.National Post Doctoral Fellowship (
            <Link
              to={{
                pathname: "https://www.serbonline.in/SERB/npdf?HomePage=New",
              }}
              target="_blank"
            >
              https://www.serbonline.in/SERB/npdf?HomePage=New
            </Link>{" "}
            )
            <br />
            II. Research Associates (
            <Link
              to={{
                pathname:
                  "https://csirhrdg.res.in/Home/Index/1/Default/2186/56",
              }}
              target="_blank"
            >
              https://csirhrdg.res.in/Home/Index/1/Default/2186/56
            </Link>
            )
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
            <Link to={{ pathname: "ajoy.kapat@snu.edu.in" }} target="_blank">
              ajoy.kapat@snu.edu.in
            </Link>
            ).
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
