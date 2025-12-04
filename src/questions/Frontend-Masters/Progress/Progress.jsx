import { useEffect, useRef } from 'react';
import './Progress.css';
const MAX = 100;

function Progress({
  value,
  max = MAX,
  onComplete = () => {},
  onStart = () => {},
  style,
}) {
  const progressStartRef = useRef(false);

  useEffect(() => {
    if (value >= max) {
      onComplete();
    }

    if (value) {
      if (progressStartRef.current) {
      } else {
        onStart();
        progressStartRef.current = true;
      }
    }

    const elem = document.getElementById('status');
    elem.innerText = `Please Wait Sir, progress is ${value}%`;
  }, [value]);
  //1. state -> Indeterminate State
  // 2. state -> determinate State

  // 2 manadatory
  // value => 0.0 1.0
  // max => 1.0
  return (
    <div>
      <progress
        aria-label='Download ReactJS'
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`Be Patient, We will be read soon. Progress ${value}`}
        max={100}
        value={value}
      ></progress>
      <span
        role='status'
        aria-live='polite'
        id='status'
        className='visible-hidden'
      ></span>
    </div>
  );
}

export default Progress;

function ProgressBadWay({
  value,
  max = MAX,
  onComplete = () => {},
  onStart = () => {},
  style,
}) {
  const progressStartRef = useRef(false);

  useEffect(() => {
    if (value >= max) {
      onComplete();
    }

    if (value) {
      if (progressStartRef.current) {
      } else {
        onStart();
        progressStartRef.current = true;
      }
    }
  }, [value]);

  return (
    <div className='progress-bar'>
      {/* <div style={{ width: `${value}%` }} className="progress-value" /> */}
      <div
        style={{ transform: `translateX(-${100 - value}%)` }}
        className='progress-value'
      />
    </div>
  );
}
