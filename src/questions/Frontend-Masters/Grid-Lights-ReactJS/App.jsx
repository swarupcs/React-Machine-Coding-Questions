import React from 'react';
import './styles.css';
import { set } from 'zod';

const config = [
  [1, 1, 0],
  [0, 1, 1],
  [1, 0, 1],
];
const App = () => {
  const [stack, setStack] = React.useState(new Map());

  const handleClick = (rowIndex, colIndex) => {
    return () => {
      const newStack = structuredClone(stack);
      const key = `${rowIndex}-${colIndex}`;

      if (newStack.get(key) || !config[rowIndex][colIndex]) {
        return;
      } else {
        newStack.set(key, true);
      }

      setStack(newStack);

      const lightsSelected = config.flat().reduce((a, b) => {
        return a + b;
      }, 0);

      if(lightsSelected === newStack.size) {
        startRollBack();
      }
    };
  };

  function startRollBack() {
    const intervalId  = setInterval(function () {
      setStack(function (prevStack) {
        const lastKey = Array.from(prevStack.keys()).pop();
        const newStack = structuredClone(prevStack);
        newStack.delete(lastKey);

        if(!newStack.size) {
          clearInterval(intervalId);
        }
        return newStack;
      })
    }, 500);

  }

  console.log("stack", stack)


  return (
    <div className='grid-light'>
      {config.map((row, rowIndex) => (
        <div key={rowIndex} className='grid-row'>
          {row.map((value, colIndex) => {
            let lightClass = '';
            if (value === 0) {
              lightClass = 'off';
            }

            const key = `${rowIndex}-${colIndex}`;

            if (stack.has(key)) {
              lightClass += 'on';
            }
            return (
              <div
                onClick={handleClick(rowIndex, colIndex)}
                key={colIndex}
                className={`light ${lightClass}`}
              >

<div>
  
</div>

              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default App;


// Enhancement - When all lights are getting off, then we should not click on any light until the rollback is completed.