const Cell = ({ id, isActive, onClick, disabled }) => {
  return (
    <div
      className={`cell ${isActive ? 'active' : ''}`}
      onClick={() => {
        if (!disabled && !isActive) {
          onClick(id);
        }
      }}
    >
      {id}
    </div>
  );
};

export default Cell;
