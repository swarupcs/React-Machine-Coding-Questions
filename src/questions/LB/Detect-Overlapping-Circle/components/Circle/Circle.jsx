const DIAMETER = 200;

const Circle = ({ top, left, background }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: DIAMETER,
        height: DIAMETER,
        borderRadius: "50%",
        background,
        opacity: 0.5,
        top,
        left,
      }}
    />
  );
};

export default Circle;
