const Interests = ({ data, setData, errors }) => {
  const { interests } = data;

  const handleDatachange = (e) => {
    const { name, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      interests: checked
        ? [...prevData.interests, name]
        : prevData.interests.filter((i) => i !== name),
    }));
  };
  return (
    <div>
      <div>
        <label htmlFor=''>
          <input
            type='checkbox'
            name='coding'
            checked={interests.includes('coding')}
            onChange={handleDatachange}
          />
          Coding
        </label>
      </div>
      <div>
        <label htmlFor=''>
          <input
            type='checkbox'
            name='javascript'
            checked={interests.includes('javascript')}
            onChange={handleDatachange}
          />
          JavaScript
        </label>
      </div>
      <div>
        <label htmlFor=''>
          <input
            type='checkbox'
            name='react'
            checked={interests.includes('react')}
            onChange={handleDatachange}
          />
          React
        </label>
      </div>
      <div>
        <label htmlFor=''>
          <input
            type='checkbox'
            name='nodejs'
            checked={interests.includes('nodejs')}
            onChange={handleDatachange}
          />
          Node.js
        </label>
      </div>
      {errors.interests && <p className='error'>{errors.interests}</p>}
    </div>
  );
};

export default Interests;
