import React, { useState } from 'react';

const Stepper = ({ list }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const progressLineWidth = (100 / (list.length - 1)) * currentStep;

  const onPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNext = () => {
    if (currentStep < list.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <section className='stepper'>
      <div className='steps-container'>
        <div className='steps-wrapper'>
          {list.map((_, index) => (
            <div
              key={index}
              className={`steps ${currentStep >= index ? 'active' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div
          className='progress-line'
          style={{ width: `${progressLineWidth}%` }}
        />
      </div>

      <div className='step-content'>
        {React.cloneElement(list[currentStep], {
          onPrev,
          onNext,
        })}
      </div>
    </section>
  );
};

export default Stepper;
