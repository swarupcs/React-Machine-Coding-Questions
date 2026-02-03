import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import "./styles.css";

const ImageComparisonSlider = ({
  image1,
  image2,
  width = "500px",
  height = "500px",
}) => {
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const sliderRef = useRef(null);

  const [canSlide, setCanSlide] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);

  // Start sliding
  const slideStart = () => {
    setCanSlide(true);
  };

  // Stop sliding
  const slideEnd = () => {
    setCanSlide(false);
  };

  // Move slider
  const slideMove = (e) => {
    if (!canSlide) return;
    if (!imageRef.current || !overlayRef.current || !sliderRef.current) return;

    let pos = getCursorPosition(e);

    // Clamp within image bounds
    if (pos < 0) pos = 0;
    if (pos > imageWidth) pos = imageWidth;

    slide(pos);
  };

  // Get cursor position relative to image
  const getCursorPosition = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].pageX : e.pageX) - rect.left;
    return x - window.pageXOffset;
  };

  // Apply styles
  const slide = (x) => {
    overlayRef.current.style.width = `${x}px`;
    sliderRef.current.style.left = `${x}px`;
  };

  // Global listeners
  useEffect(() => {
    window.addEventListener("mousemove", slideMove);
    window.addEventListener("touchmove", slideMove);
    window.addEventListener("mouseup", slideEnd);
    window.addEventListener("touchend", slideEnd);

    if (imageRef.current) {
      setImageWidth(imageRef.current.offsetWidth);
    }

    return () => {
      window.removeEventListener("mousemove", slideMove);
      window.removeEventListener("touchmove", slideMove);
      window.removeEventListener("mouseup", slideEnd);
      window.removeEventListener("touchend", slideEnd);
    };
  }, [canSlide]);

  const dimension = { width, height };

  return (
    <div className="container" style={dimension}>
      {/* Base image */}
      <img src={image1} style={dimension} alt="Base" />

      {/* Overlay image */}
      <div ref={overlayRef} className={cx("image", "overlay")}>
        <img ref={imageRef} src={image2} style={dimension} alt="Overlay" />
      </div>

      {/* Slider handle */}
      <span
        ref={sliderRef}
        className="slider"
        onMouseDown={slideStart}
        onTouchStart={slideStart}
      />
    </div>
  );
};

export default ImageComparisonSlider;
