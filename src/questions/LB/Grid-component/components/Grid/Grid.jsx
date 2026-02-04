const SPACING_MULTIPLIER = 8;

const Grid = ({ spacing = 1, children }) => {
  return (
    <div
      className="container"
      style={{
        gap: SPACING_MULTIPLIER * spacing,
        "--row-spacing": `${SPACING_MULTIPLIER * spacing - 1}px`,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
