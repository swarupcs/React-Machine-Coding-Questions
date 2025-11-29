import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!items || items.length === 0) {
    return <p>No items available.</p>;
  }

  return (
    <div className='accordion'>
      {items.map((item, index) => (
        <div key={index} className='accordion-item'>
          <button
            className='accordion-title'
            onClick={() => handleToggle(index)}
            aria-expanded={activeIndex === index}
          >
            {item.title}
            {activeIndex === index ? (
              <FaChevronUp style={{ float: 'right' }} />
            ) : (
              <FaChevronDown style={{ float: 'right' }} />
            )}
          </button>

          {activeIndex === index && (
            <div className='accordion-content'>{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
