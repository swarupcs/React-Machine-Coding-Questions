const Controls = ({ onStart, isUnwinding, disabled }) => {
  return (
    <button onClick={onStart} disabled={disabled}>
      {isUnwinding ? 'Unwinding...' : 'Start'}
    </button>
  );
};

export default Controls;
