import { useEffect, useRef, useState } from 'react';
import Cell from '../Cell/Cell';
import Controls from '../Controls/Controls';
import './Grid.css';

const Grid = ({ size }) => {
  const [clickedOrder, setClickedOrder] = useState([]);
  const [isUnwinding, setIsUnwinding] = useState(false);
  const timerRef = useRef(null);

  const handleCellClick = (id) => {
    if (isUnwinding) return;
    setClickedOrder((prev) => [...prev, id]);
  };

  const startUnwinding = () => {
    if (clickedOrder.length === 0) return;
    setIsUnwinding(true);
  };

  useEffect(() => {
    if (!isUnwinding) return;

    if (clickedOrder.length === 0) {
      setIsUnwinding(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      setClickedOrder((prev) => prev.slice(1));
    }, 500);

    return () => clearTimeout(timerRef.current);
  }, [clickedOrder, isUnwinding]);

  const renderGrid = () => {
    let id = 1;
    const rows = [];

    for (let i = 0; i < size; i++) {
      const cells = [];
      for (let j = 0; j < size; j++) {
        cells.push(
          <Cell
            key={id}
            id={id}
            isActive={clickedOrder.includes(id)}
            onClick={handleCellClick}
            disabled={isUnwinding}
          />
        );
        id++;
      }
      rows.push(
        <div key={i} className='grid-row'>
          {cells}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className='grid-area'>
      <Controls
        onStart={startUnwinding}
        isUnwinding={isUnwinding}
        disabled={clickedOrder.length === 0 || isUnwinding}
      />
      <div className='grid'>{renderGrid()}</div>
    </div>
  );
};

export default Grid;
