const Controls = ({ onUndo, onRedo, onReset, canUndo, canRedo, canReset }) => {
  return (
    <div id='button-area'>
      <button onClick={onUndo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
      <button onClick={onReset} disabled={!canReset}>
        Reset
      </button>
    </div>
  );
};

export default Controls;
