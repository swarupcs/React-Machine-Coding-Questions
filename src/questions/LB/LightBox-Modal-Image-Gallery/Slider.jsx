import Slide from "./Slide";

const Slider = ({ images, active, setActive }) => {
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
      <div className="slides">
        {images.map((img, index) => (
          <Slide
            key={img.caption}
            {...img}
            active={index === active}
          />
        ))}
      </div>

      <div className="navigation-next-prev">
        <div className="next-prev prev" onClick={onPrev}>
          &lt;
        </div>
        <div className="next-prev next" onClick={onNext}>
          &gt;
        </div>
      </div>
    </div>
  );
};

export default Slider;
