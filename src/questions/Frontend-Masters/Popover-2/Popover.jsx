import './Popover.css';

import { createContext, useContext, useRef, useState } from 'react';


const PopoverContext = createContext({});

const Popover = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef(null);

  const togglePopover = () => {
    const newValue = !isOpen;
    setIsOpen(newValue);

    if(newValue) {
      const { top, left, height } = contentRef.current.getBoundingClientRect();

      console.log(top, window.innerHeight)
      const contentPosition = top + height;
      if (contentPosition >= window.innerHeight) {
        //Overflowing the bottom of the screen
        contentRef.current.style.top = `${top - contentPosition}px`;
      }
    }
  };
  return (
    <PopoverContext.Provider value={{ contentRef, isOpen, togglePopover }}>
      <div className='popover'>{children}</div>
    </PopoverContext.Provider>
  );
};

export default Popover;

function Action({ label, node, children }) {
  const { togglePopover } = useContext(PopoverContext);
  if (node) {
    return <button onClick={togglePopover}>{node}</button>;
  }

  if (children) {
    return <button onClick={togglePopover}>{children}</button>;
  }

  return <button onClick={togglePopover}>{label}</button>;
}

function Content({ children }) {
  const { isOpen, contentRef } = useContext(PopoverContext);
  
  const className = isOpen ? 'content' : 'content hidden';
  
  return <div ref={contentRef} className={className}>{children}</div>;
}

Popover.Action = Action;
Popover.Content = Content;

// 28:00