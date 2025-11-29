import { useState } from 'react';
import './App.css';

const checkboxesData = [
  {
    id: 1,
    name: 'Fruits',
    children: [
      { id: 2, name: 'Apple' },
      { id: 3, name: 'Banana' },
      { id: 4, name: 'Mango' },
    ],
  },
  {
    id: 5,
    name: 'Vegetables',
    children: [
      { id: 6, name: 'Carrot' },
      { id: 7, name: 'Potato' },
      {
        id: 8,
        name: 'Tomato',
        children: [
          { id: 9, name: 'Red Tomato' },
          { id: 10, name: 'Green Tomato' },
          { id: 11, name: 'Yellow Tomato' },
        ],
      },
    ],
  },
  {
    id: 12,
    name: 'Grains',
    children: [
      {
        id: 13,
        name: 'Rice',
        children: [
          {
            id: 14,
            name: 'Rice Varieties',
            children: [
              { id: 15, name: 'Basmati' },
              { id: 16, name: 'Jasmine' },
              { id: 17, name: 'Sona Masoori' },
            ],
          },
          {
            id: 18,
            name: 'Wheat Varieties',
            children: [
              { id: 19, name: 'Durum Wheat' },
              { id: 20, name: 'Emmer Wheat' },
              { id: 21, name: 'Hard Red Wheat' },
            ],
          },
          {
            id: 22,
            name: 'Barley Varieties',
            children: [
              { id: 23, name: 'Hulled Barley' },
              { id: 24, name: 'Pearl Barley' },
              { id: 25, name: 'Black Barley' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 26,
    name: 'Proteins',
    children: [
      { id: 27, name: 'Chicken' },
      { id: 28, name: 'Fish' },
      { id: 29, name: 'Egg' },
    ],
  },
];

const CheckBoxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, item) => {
    setChecked((prev) => {
      const newState = { ...prev, [item.id]: isChecked };
      // If children are present , add all of them to the state

      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };
      updateChildren(item);

      // If all children are checked, mark the parent as checked
      const verifyChecked = (node) => {
        if(!node.children) return newState[node.id] || false;

        const allChildrenChecked = node.children.every((child) => {
          return verifyChecked(child);
        });

        newState[node.id] = allChildrenChecked;
        return allChildrenChecked;
      }

      checkboxesData.forEach((node) => {
        verifyChecked(node);
      });

      return newState;
    });
  };
  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className='parent'>
          <input
            type='checkbox'
            id={item.id}
            name={item.name}
            checked={checked[item.id] || false}
            onChange={(e) => handleChange(e.target.checked, item)}
          />
          <label htmlFor={item.id}>{item.name}</label>
          {item.children && (
            <CheckBoxes
              data={item.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [checked, setChecked] = useState({});

  return (
    <CheckBoxes
      data={checkboxesData}
      checked={checked}
      setChecked={setChecked}
    />
  );
}

export default App;


