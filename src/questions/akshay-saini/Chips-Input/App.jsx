import { useState } from 'react';

import './App.css';

function App() {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [idCounter, setIdCounter] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setChips([...chips, { id: idCounter, label: inputValue.trim() }]);
      setIdCounter(idCounter + 1);
      setInputValue('');
    }
  };

  const handleDeleteChip = (id) => {
    setChips(chips.filter((chip) => chip.id !== id));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '40px 0',
      }}
    >
      <h2>Chips Input</h2>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder='Enter a chip'
        style={{
          width: '200px',
          padding: '8px',
        }}
      />
      <div
        style={{
          margin: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {chips.map((chip) => (
          <div
            key={chip.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '5px',
              backgroundColor: 'Lightgray',
              borderRadius: '20px',
              padding: '5px 10px',
            }}
            onClick={() => handleDeleteChip(chip.id)}
          >
            <span>{chip.label}</span>
            <span
              onClick={() => handleDeleteChip(chip.id)}
              style={{ background: "transparent", border: "none", marginLeft: "8px", cursor: 'pointer', color: "red" }}
            >
              X
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
