import React, { useEffect, useState } from "react";
import home from "../content/home.json";
import { useContent } from "../lib/useContent";

const SLIDE_MS = 6000;
const SLIDES_QUERY = `*[_id == "homePage"][0].slides[]{"img": imageUrl}`;

function Carousel() {
  const slides = useContent(SLIDES_QUERY, home.carousel);
  const [active, setActive] = useState(0);

  // Keep the index valid if the slide list changes size (e.g. CMS data lands)
  const current = active % slides.length;

  // Auto-advance; picking a dot restarts the full interval.
  useEffect(() => {
    const timer = setTimeout(
      () => setActive((current + 1) % slides.length),
      SLIDE_MS
    );
    return () => clearTimeout(timer);
  }, [current, slides.length]);

  return (
    <div className="hero-carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.img}
          className={index === current ? "hero-slide is-active" : "hero-slide"}
        >
          <img src={slide.img} alt={`Research highlight ${index + 1}`} />
        </div>
      ))}
      <div className="hero-slide-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === current ? "is-active" : undefined}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === current}
            onClick={() => setActive(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
