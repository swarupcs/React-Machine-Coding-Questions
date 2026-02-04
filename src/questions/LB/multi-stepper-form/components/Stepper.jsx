import React, { useState } from "react";
import "../styles/stepper.css";

const Stepper = ({ list }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = list.length;

  const progressWidth = (100 / (totalSteps - 1)) * currentStep;

  const onNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const onPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  return (
    <section className="stepper">
      {/* Step Indicators */}
      <div className="steps-container">
        <div className="steps-wrapper">
          {list.map((_, i) => (
            <div
              key={i}
              className={`step ${i <= currentStep ? "active" : ""}`}
              onClick={() => setCurrentStep(i)}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      {/* Current Step Content */}
      <div className="step-content">
        {React.cloneElement(list[currentStep], {
          onNext,
          onPrev,
          hasNext: currentStep < totalSteps - 1,
          hasPrevious: currentStep > 0,
        })}
      </div>
    </section>
  );
};

export default Stepper;
