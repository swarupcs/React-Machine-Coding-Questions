import { useEffect, useState } from 'react';
import './App.css';
import Progress from './Progress';




function App() {
  const [val, setVal] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setVal((prev) => prev + 10);
    }, 2000);
  }, []);

  function handleStart() {
    console.log('Started');
  }

  function handleComplete() {
    console.log('Completed');
  }

  return (
    <Progress onComplete={handleComplete} onStart={handleStart} value={val} />
  );
}

export default App;
