const Slide = ({ image_url, caption, active }) => {
  return (
    <div className={`slide ${active ? "active" : ""}`}>
      <img src={image_url} alt={caption} />
      <span>{caption}</span>
    </div>
  );
};

export default Slide;
