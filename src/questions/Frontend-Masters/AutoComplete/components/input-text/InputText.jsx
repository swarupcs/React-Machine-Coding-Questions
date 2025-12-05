import "./style.css";

function InputText({ value, onChange }) {
  function handleChange(e) {
    onChange(e.target.value);
  }

  return <input type="text" value={value} onChange={handleChange} />;
}

export default InputText;
