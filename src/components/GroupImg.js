import React from "react";
import "./GroupGal.css";

function GroupImg() {
  return (
    <div className="home body">
      <div className="home-main body-child">
        <div className="group-photo row">
          <h2 style={{ margin: "8vh 0 5vh 0" }}>Group Photo</h2>
          <div className="gallery">
            <div class="row">
              <div class="col-sm-4">
                <img
                  src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1651168509/IMG_20200717_141734_tpbw7v.jpg"
                  className="rounded col-sm-4"
                  alt="..."
                  style={{ width: "100%" }}
                />
              </div>
              <div class="col-sm-4">
                <img
                  src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1651168543/IMG_20211216_213420_vtssk0.jpg"
                  className="rounded col-sm-4"
                  alt="..."
                  style={{ width: "100%" }}
                />
              </div>
              <div class="col-sm-4">
                <img
                  src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1653040948/IMG_5924_zwqc8h.jpg"
                  className="rounded col-sm-4"
                  alt="..."
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div class="row">
              <div class="col-sm-4"></div>
              <div class="col-sm-4"></div>
              <div class="col-sm-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupImg;
