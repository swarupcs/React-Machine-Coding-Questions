const Form2 = ({ onNext, onPrev, hasPrevious, hasNext }) => (
  <div>
    <h3>Address Details</h3>

    <div className="actions">
      {hasPrevious && <button onClick={onPrev}>Prev</button>}
      {hasNext && <button onClick={onNext}>Next</button>}
    </div>
  </div>
);

export default Form2;
