import { useState } from 'react';
import Grid from '../Grid/Grid';

const Controls = () => {
  const [size, setSize] = useState('');
  const [renderGrid, setRenderGrid] = useState(false);

  const handleGenerate = () => {
    if (size > 0) setRenderGrid(true);
  };

  return (
    <>
      <input
        type='number'
        placeholder='Enter grid size'
        value={size}
        onChange={(e) => {
          setRenderGrid(false);
          setSize(Number(e.target.value));
        }}
      />
      <button onClick={handleGenerate}>Generate</button>

      {renderGrid && <Grid size={size} />}
    </>
  );
};

export default Controls;
