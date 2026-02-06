const GridCell = ({ value, onClick }) => {
  return (
    <div
      className={`grid-cell ${value !== null ? 'active' : ''}`}
      onClick={onClick}
    >
      {value ?? ''}
    </div>
  );
};

export default GridCell;
