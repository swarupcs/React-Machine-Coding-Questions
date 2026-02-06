import { useState } from 'react';

const CreateItemForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('folder');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name, type });
    setName('');
  };

  return (
    <div>
      <input
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value='folder'>Folder</option>
        <option value='file'>File</option>
      </select>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default CreateItemForm;
