

const Settings = ({ data, setData }) => {
  const { theme } = data;
  const handleDatachange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  
  return (
    <div>
      <div>
        <label htmlFor=''>
          <input
            type='radio'
            name='theme'
            value='dark'
            checked={theme === 'dark'}
            onChange={handleDatachange}
          />
          Dark
        </label>
        <label htmlFor=''>
          <input
            type='radio'
            name='theme'
            value='light'
            checked={theme === 'light'}
            onChange={handleDatachange}
          />
          Light
        </label>
      </div>
    </div>
  );
};

export default Settings;
