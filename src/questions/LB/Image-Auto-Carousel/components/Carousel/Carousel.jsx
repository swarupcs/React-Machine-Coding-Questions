import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "@react-spring/web";
import styles from "./Carousel.module.css";

const IMAGES = [
  "https://cdn.pixabay.com/photo/2019/12/30/13/10/lost-places-4729640_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/09/16/15/31/boy-3681679_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/09/11/00/47/trunks-3668420_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/11/14/12/13/young-3815082_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/11/14/12/12/young-3815077_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/09/15/11/19/male-3679138_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/11/14/12/10/young-3815069_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/11/16/00/20/young-3818476_1280.jpg"
];

const AUTO_SLIDE_DELAY = 3500;
const RESUME_DELAY = 1500;

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [isNext, setIsNext] = useState(true);

  const autoSlideRef = useRef(null);
  const resumeRef = useRef(null);

  /* ---------------- Auto Slide ---------------- */

  const startAutoSlide = () => {
    autoSlideRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
      setIsNext(true);
    }, AUTO_SLIDE_DELAY);
  };

  const clearTimers = () => {
    clearInterval(autoSlideRef.current);
    clearTimeout(resumeRef.current);
    autoSlideRef.current = null;
    resumeRef.current = null;
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      clearTimers();
    };
  }, []);

  /* ---------------- Navigation ---------------- */

  const handleNext = () => {
    clearTimers();
    setCurrent((prev) => (prev + 1) % IMAGES.length);
    setIsNext(true);
    resumeAutoSlide();
  };

  const handlePrev = () => {
    clearTimers();
    setCurrent((prev) =>
      prev - 1 < 0 ? IMAGES.length - 1 : prev - 1
    );
    setIsNext(false);
    resumeAutoSlide();
  };

  const resumeAutoSlide = () => {
    resumeRef.current = setTimeout(() => {
      startAutoSlide();
    }, RESUME_DELAY);
  };

  /* ---------------- Animation ---------------- */

  const transitions = useTransition(current, {
    key: current,
    from: {
      opacity: 0,
      transform: `translate3d(${isNext ? "100%" : "-50%"},0,0)`
    },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: {
      opacity: 0,
      transform: `translate3d(${isNext ? "-50%" : "100%"},0,0)`
    }
  });

  /* ---------------- Render ---------------- */

  return (
    <>
      <div className={styles.wrapper}>
        {transitions((style, index) => (
          <animated.div
            className={styles.slide}
            style={{
              ...style,
              backgroundImage: `url(${IMAGES[index]})`
            }}
          />
        ))}
      </div>

      <div className={styles.controls}>
        <span onClick={handlePrev}>Prev</span>
        <span onClick={handleNext}>Next</span>
      </div>
    </>
  );
};

export default Carousel;
