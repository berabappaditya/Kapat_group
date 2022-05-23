import React from "react";
import { research } from "../Data/ResearchData";

function Research() {
  return (
    <div className="home body">
      <div className="home-main body-child">
        <div className="research-main" style={{ margin: "10vh 0 10vh 0" }}>
          {research.map((item) => {
            return (
              <div className="research-sec m-5">
                <p>
                  <b>{item.title}</b>
                  &nbsp;{item.details}
                </p>
                <div className="d-flex align-item-center justify-content-center mb-5">
                  <img
                    src={item.img}
                    style={{ height: "30vh", width: "auto" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Research;
