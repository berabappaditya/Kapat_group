import React from "react";
import { facilitiesData } from "../Data/ResearchData";

function Facilities() {
  return (
    <div className="home body">
      <div className="home-main body-child">
        <div className="container-fluid">
          <div className="row" style={{ margin: "10vh 1vw 10vh 1vw" }}>
            {facilitiesData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-sm-4"
                  style={{
                    height: "34vh",
                    margin: "3vh  0 3vh 0",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={item.imgSrc}
                    alt="..."
                    style={{ height: "90%", maxWidth: "100%" }}
                  />
                  <p style={{ fontWeight: "500" }}>{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facilities;
