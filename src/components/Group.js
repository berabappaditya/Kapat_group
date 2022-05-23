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
              style={{ margin: "10vh 2vh 10vh 2vh" }}
            >
              <div className="col-sm-4">
                <div
                  style={{
                    height: "20vh",
                    textAlign: "center",
                  }}
                >
                  <img style={{ height: "80%" }} src={item.imgl} />
                  <div style={{ textAlign: "center" }}>
                    <p>{item.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-8">
                <p>{item.details}</p>
              </div>
            </div>
          );
        })}

        <div className="group-photo row">
          <h3>Group Photo</h3>
          <div className="gallery">
            <img
              src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1651168509/IMG_20200717_141734_tpbw7v.jpg"
              className="rounded col-sm-4"
              alt="..."
            />
            <img
              src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1651168509/IMG_20200717_141734_tpbw7v.jpg"
              className="rounded col-sm-8"
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Group;
