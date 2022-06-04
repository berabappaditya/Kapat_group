import React from "react";
import { IoChevronForwardCircle, IoChevronBackCircle } from "react-icons/io5";

function Carousel() {
  return (
    <div id="home_carousel" style={{ margin: "0 -3vw" }}>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators" style={{ color: "red" }}>
          <li
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active d-flex justify-content-center"
            aria-current="true"
            aria-label="Slide 1"
          ></li>
          <li
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
            className="d-flex justify-content-center"
          ></li>
          <li
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            className="d-flex justify-content-center"
            aria-label="Slide 3"
          ></li>
          <li
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={3}
            className="d-flex justify-content-center"
            aria-label="Slide 4"
          ></li>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="1000">
            <img
              src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1650744750/Assym_Cat-AK.001_spdfsi.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="1000">
            <img
              src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1650744725/MCR-AK.001_umym2n.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1653557612/Asym_Cat-AK.001_wessku.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1653559786/Lab_A221.002_sdwixa.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          {/* <GrPrevious style={{ fontWeight: "500" }} /> */}
          {/* <span className="carousel-control-prev-icon" aria-hidden="true" /> */}
          <IoChevronBackCircle
            style={{
              fontWeight: "bold",
              color: "#3143ff",
              fontSize: "1.5rem",
            }}
          />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <IoChevronForwardCircle
            style={{
              fontWeight: "bold",
              color: "#3143ff",
              fontSize: "1.5rem",
            }}
          />
          {/* <span className="carousel-control-next-icon" aria-hidden="true" /> */}
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
