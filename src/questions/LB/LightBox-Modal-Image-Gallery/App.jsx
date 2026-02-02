import { useState } from "react";
import Modal from "./Modal";
import Slider from "./Slider";

export default function App() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(0);

  const images = [
    {
      image_url:
        "https://img.freepik.com/free-photo/young-female-jacket-shorts-presenting-comparing-something-looking-confident-front-view_176474-37521.jpg",
      caption: "Image 1",
    },
    {
      image_url:
        "https://img.freepik.com/free-photo/girl-grey-shirt-showing-something-her-hand_144627-51099.jpg",
      caption: "Image 2",
    },
    {
      image_url:
        "https://img.freepik.com/free-photo/young-lady-shirt-jacket-making-scales-gesture-looking-cheerful-front-view_176474-85195.jpg",
      caption: "Image 3",
    },
    {
      image_url:
        "https://img.freepik.com/free-photo/girl-wide-opening-hands-giving-explanation-high-quality-photo_144627-60466.jpg",
      caption: "Image 4",
    },
    {
      image_url:
        "https://img.freepik.com/free-photo/young-lady-shirt-jacket-making-scales-gesture-looking-cheerful-front-view_176474-85195.jpg",
      caption: "Image 5",
    },
    {
      image_url:
        "https://img.freepik.com/free-photo/girl-wide-opening-hands-giving-explanation-high-quality-photo_144627-60466.jpg",
      caption: "Image 6",
    },
  ];

  const handleClick = (index) => {
    setActive(index);
    setShow(true);
  };

  return (
    <div className="App">
      <h2>Lightbox Image Gallery</h2>

      <Modal show={show} title="Lightbox" onClose={() => setShow(false)}>
        <Slider
          images={images}
          active={active}
          setActive={setActive}
        />
      </Modal>

      {/* Image Grid */}
      <div className="image-list">
        {images.map((img, index) => (
          <div
            key={img.caption}
            className={index === active ? "active" : ""}
            onClick={() => handleClick(index)}
          >
            <img src={img.image_url} alt={img.caption} />
          </div>
        ))}
      </div>
    </div>
  );
}
