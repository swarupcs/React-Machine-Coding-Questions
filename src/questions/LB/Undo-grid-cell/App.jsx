import { useState } from 'react';
import Grid from './components/Grid/Grid';

function App() {
  const [size, setSize] = useState('');
  const [showGrid, setShowGrid] = useState(false);

  const handleSubmit = () => {
    if (size > 0) setShowGrid(true);
  };

  return (
    <div className='App'>
      <input
        type='number'
        placeholder='Enter grid size'
        onChange={(e) => {
          setSize(e.target.value);
          setShowGrid(false);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>

      {showGrid && <Grid size={Number(size)} />}
    </div>
  );
}

export default App;
