const Form3 = ({ onPrev, hasPrevious }) => (
  <div>
    <h3>Confirmation</h3>
    {hasPrevious && <button onClick={onPrev}>Prev</button>}
    <button disabled>Submit</button>
  </div>
);

export default Form3;
