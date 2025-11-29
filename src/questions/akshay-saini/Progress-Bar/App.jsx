import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

const ProgressBar = ({ progress }) => {
  console.log(progress);

  const [animatedProgress, setAnimatedProgress] = useState(progress);
  useEffect(() => {
    setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
  }, [progress]);
  return (
    <div className='outer'>
      <div
        className='inner'
        style={{
          // width: `${progress}%`,
          transform: `translateX(-${100 - animatedProgress}%)`,
          color: animatedProgress < 5 ? 'black' : 'white',
        }}
        role='progressbar'
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {progress}%
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <ProgressBar progress={100} />
    </>
  );
}

export default App;


// Difference between width and transform
