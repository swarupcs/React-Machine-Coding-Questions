import GridCell from './GridCell';
import { useGrid } from '../../hooks/useGrid';
import './Grid.css';

const Grid = ({ size }) => {
  const { grid, handleCellClick } = useGrid(size);

  return (
    <div className='grid-wrapper'>
      {Array.from({ length: size }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className={`grid-row ${rowIdx % 2 !== 0 ? 'reverse' : ''}`}
        >
          {Array.from({ length: size }).map((_, colIdx) => {
            const index = rowIdx * size + colIdx;
            return (
              <GridCell
                key={index}
                value={grid[index]}
                onClick={() => handleCellClick(index)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
