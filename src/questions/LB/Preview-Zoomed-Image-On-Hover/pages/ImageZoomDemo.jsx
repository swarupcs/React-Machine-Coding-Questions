import React, { useState } from "react";
import ImageZoom from "../components/ImageZoom";

const ImageZoomDemo = () => {
  const [active, setActive] = useState(false);

  return (
    <ImageZoom
      isActive={active}
      imageURL="https://cdn.pixabay.com/photo/2019/12/30/13/10/lost-places-4729640_1280.jpg"
      zoomImageURL="https://cdn.pixabay.com/photo/2019/12/30/13/10/lost-places-4729640_1280.jpg"
      zoomType="hover"
      placement="top-right"
      onZoom={() => setActive(true)}
      onClose={() => setActive(false)}
    />
  );
};

export default ImageZoomDemo;
