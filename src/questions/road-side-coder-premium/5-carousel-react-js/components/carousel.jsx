import { useEffect, useRef, useState } from 'react';

const Carousel = ({
  images = [],
  isLoading = false,
  imageLimit = images.length,
  customPrevButton,
  customNextButton,
  onImgClick = () => {},
  imgPerSlide = 1,
}) => {
  const imgRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgWidth, setImgWidth] = useState(300); // fallback width

  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageLimit - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageLimit - 1 ? 0 : prevIndex + 1
    );
  };

  const safeImages = images.slice(
    0,
    imageLimit > images.length ? images.length : imageLimit
  );

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className='carousel' style={{ width: imgPerSlide * imgWidth }}>
      <div
        className='image-container'
        style={{
          transform: `translateX(-${currentIndex * imgWidth}px)`,
          transition: 'transform 0.4s ease',
        }}
      >
        {safeImages.map((image, index) => (
          <img
            key={image.id}
            ref={index === 0 ? imgRef : null}
            src={
              image.url ||
              `https://picsum.photos/seed/${image.id}/${600}/${400}`
            }
            onError={(e) => {
              e.target.src = `https://picsum.photos/seed/${image.id}/600/400`;
            }}
            onLoad={() => {
              if (index === 0 && imgRef.current) {
                setImgWidth(imgRef.current.offsetWidth || 300);
              }
            }}
            onClick={() => onImgClick(image, index)}
            alt={image.title}
            className='image'
          />
        ))}
      </div>

      {customPrevButton ? (
        customPrevButton(goToPrev)
      ) : (
        <button className='btn prev' onClick={goToPrev}>
          Prev
        </button>
      )}

      {customNextButton ? (
        customNextButton(goToNext)
      ) : (
        <button className='btn next' onClick={goToNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Carousel;
