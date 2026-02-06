import { useRef } from 'react';
import Circle from '../Circle/Circle';
import Controls from '../Controls/Controls';
import { getRandomColor } from '../../utils/helpers';
import { useHistory } from '../../hooks/useHistory';
import './Board.css';

const Board = () => {
  const boardRef = useRef(null);
  const { present, past, add, undo, redo, reset } = useHistory();

  const handleClick = (e) => {
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    add({
      id: Date.now(),
      x,
      y,
      color: getRandomColor(),
    });
  };

  return (
    <>
      <Controls
        onUndo={undo}
        onRedo={redo}
        onReset={reset}
        canUndo={present.length > 0}
        canRedo={past.length > 0}
        canReset={present.length > 0}
      />

      <div ref={boardRef} id='circle-area' onClick={handleClick}>
        {present.map((circle) => (
          <Circle key={circle.id} {...circle} />
        ))}
      </div>
    </>
  );
};

export default Board;
