import React from "react";
import { groupMem } from "../Data/GroupData";

function Group() {
  return (
    <div className="home body">
      <div className="home-main body-child">
        {groupMem.map((item, index) => {
          return (
            <div
              className="group-mem row"
              style={{
                margin: "10vh 2vh 10vh 2vh",
              }}
            >
              <div className="col-sm-4">
                <div
                  style={{
                    height: "27vh",
                    width: "90%",
                    textAlign: "center",
                    borderRadius: "2px",
                    boxShadow: "0px 0px 10px 0 gray",
                    padding: ".5vw",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "2px",
                      height: "80%",
                      maxWidth: "100%",
                      maxHeight: "82%",
                    }}
                    src={item.imgl}
                    alt="..."
                  />
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        marginTop: "1vh",
                        fontWeight: "600",
                      }}
                      className="groupPara"
                    >
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-8 d-flex align-items-center">
                <p className="groupPara">{item.details}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Group;
