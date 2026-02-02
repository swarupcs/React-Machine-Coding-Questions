const Beer = ({ name, tagline, image_url }) => {
  return (
    <div className="beer">
      <img
        src={image_url}
        alt={name}
        loading="lazy"
      />
      <div>
        <h3>{name}</h3>
        <p>{tagline}</p>
      </div>
    </div>
  );
};

export default Beer;
