import { useState } from "react";
import Slide from "./Slide";

const Slider = ({ images }) => {
  const [active, setActive] = useState(0);

  const onNext = () => {
    if (active < images.length - 1) {
      setActive(active + 1);
    }
  };

  const onPrev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  return (
    <div className="slider">
      {/* Slides */}
      <div className="slides">
        {images.map((img, index) => (
          <Slide
            key={img.caption}
            {...img}
            active={index === active}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="navigation">
        {/* Thumbnails */}
        <div className="navigation-bottom">
          {images.map((img, index) => (
            <img
              key={img.caption}
              src={img.image_url}
              alt={img.caption}
              className={`preview ${index === active ? "active" : ""}`}
              style={{ width: `${100 / images.length}%` }}
              onClick={() => setActive(index)}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="navigation-next-prev">
          <div className="next-prev prev" onClick={onPrev}>
            &lt;
          </div>
          <div className="next-prev next" onClick={onNext}>
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
