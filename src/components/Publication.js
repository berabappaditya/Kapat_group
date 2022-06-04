import React from "react";
import { publication } from "../Data/PublicationData";

function Publication() {
  return (
    <div className="home body">
      <div className="home-main body-child">
        <div className="publication-main">
          <div className="publication-banner">
            <h1>Publication</h1>
          </div>

          <div style={{ margin: "1vh 2vw 0 3vh" }}>
            <div
              style={{
                marginLeft: "5px",
                marginBottom: "2vh",
                height: "3px",
                width: "15vw",
                backgroundColor: "#008BFF",
                borderRadius: "1px",
              }}
            ></div>
            <h3 style={{ marginBottom: "5vh" }}>
              Publication Before Joining SNU
            </h3>
            {publication.reverse().map((item, index) => {
              return (
                <p style={{ marginLeft: "1vw" }}>
                  <b>{publication.length - index}.</b>&nbsp;
                  {item.details}
                  {item.link}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publication;
