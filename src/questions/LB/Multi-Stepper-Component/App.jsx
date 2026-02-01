import Stepper from './Stepper';

const StepOne = ({ onNext }) => {
  return (
    <div>
      <h3>Step 1</h3>
      <p>Basic Details</p>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

const StepTwo = ({ onPrev, onNext }) => {
  return (
    <div>
      <h3>Step 2</h3>
      <p>Address Details</p>
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

const StepThree = ({ onPrev }) => {
  return (
    <div>
      <h3>Step 3</h3>
      <p>Review & Submit</p>
      <button onClick={onPrev}>Previous</button>
      <button>Submit</button>
    </div>
  );
};

export default function App() {
  return (
    <div className='app'>
      <h2>Multi Stepper</h2>

      <Stepper list={[<StepOne />, <StepTwo />, <StepThree />]} />
    </div>
  );
}
