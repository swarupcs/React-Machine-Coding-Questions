import { useState } from 'react';
import Interests from './Interests';
import Profile from './Profile';
import Settings from './Settings';

const TabForm = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    interests: ['coding', 'javascript', 'react'],
    theme: 'dark',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    interests: '',
    theme: '',
  });
  const [activeTab, setActiveTab] = useState(0);
  // Config Driven UI
  const tabs = [
    {
      name: 'Profile',
      component: Profile,
      validate: () => {
        const err = {};
        if (!data.name || data.name.length < 2) {
          err.name = 'Name is not valid';
        }
        if (!data.email || !data.email.length < 2) {
          err.email = 'Email is required';
        }
        if (!data.age || data.age.length < 18) {
          err.age = 'Age is not valid';
        }
        setErrors(err);
        return err.name || err.age || err.email ? false : true;
      }
    },
    {
      name: 'Interests',
      component: Interests,
      validate: () => {
        const err = {};
        if (!data.interests || data.interests.length < 1) {
          err.interests = 'Select at least one interest';
        }
        setErrors(err);
        return err.interests ? false : true;
      }
    },
    {
      name: 'Settings',
      component: Settings,
      validate: () => {
        const err = {};
        if (!data.theme) {
          err.theme = 'Select a theme';
        }
        setErrors(err);
        return err.theme ? false : true;
      }
    },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  const handleNextClick = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePreviousClick = () => {
    if (tabs  [activeTab].validate()) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleSubmitClick = () => {
    console.log('data', data);
  };

  console.log('data', data);
  return (
    <div>
      <div className='heading-container'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className='heading'
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className='tab-body'>
        <ActiveTabComponent data={data} setData={setData} errors={errors} />
      </div>
      <div>
        {activeTab > 0 && (
          <button onClick={handlePreviousClick}>Previous</button>
        )}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNextClick}>Next</button>
        )}
        {activeTab === tabs.length - 1 && <button onClick={handleSubmitClick}>Submit</button>}
      </div>
    </div>
  );
};

export default TabForm;
