import React from 'react';

const Profile = ({ data, setData, errors }) => {
  const { name, email, age } = data;
  const handleDatachange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div>
      <div>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' value={name} onChange={handleDatachange} />
        {errors.name && <p className='error'>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor='age'>Age</label>
        <input type='number' id='age' value={age} onChange={handleDatachange} />
        {errors.age && <p className='error'>{errors.age}</p>}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={handleDatachange}
        />
        {errors.email && <p className='error'>{errors.email}</p>}
      </div>
    </div>
  );
};

export default Profile;
