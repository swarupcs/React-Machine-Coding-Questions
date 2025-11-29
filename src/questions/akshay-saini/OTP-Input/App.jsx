import { useState } from 'react';
import './App.css';
import { useRef } from 'react';
import { useEffect } from 'react';

function App() {
  const OTP_DIGITS_COUNT = 5;

  const [inputArray, setInputArray] = useState(
    new Array(OTP_DIGITS_COUNT).fill('')
  );

  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newInputArray = [...inputArray];
    newInputArray[index] = newValue.slice(-1);
    setInputArray(newInputArray);

    newValue && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      refArr.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <h1>Validate OTP</h1>
      <div>
        {inputArray.map((input, index) => (
          <input
            key={index}
            type='number'
            value={inputArray[index]}
            ref={(input) => (refArr.current[index] = input)}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onWheel={(e) => e.preventDefault()}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            className='otp-input'
          />
        ))}
      </div>
    </>
  );
}

export default App;
