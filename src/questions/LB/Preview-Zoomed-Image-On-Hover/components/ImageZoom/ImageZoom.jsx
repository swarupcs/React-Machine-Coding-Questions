import React, { useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./ImageZoom.module.css";

const ImageZoom = ({
  imageURL,
  zoomImageURL,
  placement,
  imageSize,
  zoomedImageSize,
  isActive,
  zoomType,
  onZoom,
  onClose
}) => {
  const normalImageRef = useRef(null);
  const zoomedImageRef = useRef(null);

  /* ---------------- Styles ---------------- */

  const normalImageStyle = {
    backgroundImage: `url(${imageURL})`,
    backgroundSize: `${imageSize.width}px ${imageSize.height}px`,
    width: imageSize.width,
    height: imageSize.height
  };

  const zoomedImageStyle = {
    backgroundImage: `url(${zoomImageURL || imageURL})`,
    backgroundRepeat: "no-repeat",
    backgroundSize:
      zoomType === "click"
        ? `${zoomedImageSize.width}px ${zoomedImageSize.height}px`
        : `${zoomedImageSize.width * 1.5}px ${
            zoomedImageSize.height * 1.5
          }px`,
    width: zoomedImageSize.width,
    height: zoomedImageSize.height
  };

  /* ---------------- Events ---------------- */

  const eventHandlers =
    zoomType === "click"
      ? { onClick: isActive ? onClose : onZoom }
      : {
          onMouseMove: handleMove,
          onMouseLeave: onClose,
          onTouchMove: handleMove,
          onTouchEnd: onClose,
          onTouchCancel: onClose
        };

  function handleMove(e) {
    onZoom();
    if (!zoomedImageRef.current) return;
    moveZoom(e);
  }

  /* ---------------- Zoom Logic ---------------- */

  const getCursorPosition = (e) => {
    const rect = normalImageRef.current.getBoundingClientRect();

    const x =
      (e.touches ? e.touches[0].pageX : e.pageX) -
      rect.left -
      window.pageXOffset;

    const y =
      (e.touches ? e.touches[0].pageY : e.pageY) -
      rect.top -
      window.pageYOffset;

    return { x, y };
  };

  const moveZoom = (e) => {
    e.preventDefault();
    const { x, y } = getCursorPosition(e);
    zoomedImageRef.current.style.backgroundPosition = `-${x}px -${y}px`;
  };

  /* ---------------- Render ---------------- */

  return (
    <div
      ref={normalImageRef}
      className={cx(styles.normalImage, {
        [styles.zoomOutCursor]: isActive
      })}
      style={normalImageStyle}
      {...eventHandlers}
    >
      {isActive && (
        <div
          ref={zoomedImageRef}
          className={cx(styles.zoomedImage, styles[placement])}
          style={zoomedImageStyle}
        />
      )}
    </div>
  );
};

/* ---------------- PropTypes ---------------- */

ImageZoom.propTypes = {
  imageURL: PropTypes.string.isRequired,
  zoomImageURL: PropTypes.string,
  placement: PropTypes.oneOf([
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "center"
  ]),
  imageSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  zoomedImageSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  isActive: PropTypes.bool.isRequired,
  onZoom: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  zoomType: PropTypes.oneOf(["click", "hover"])
};

ImageZoom.defaultProps = {
  placement: "top-right",
  zoomImageURL: "",
  imageSize: { width: 300, height: 300 },
  zoomedImageSize: { width: 600, height: 600 },
  zoomType: "hover"
};

export default ImageZoom;
