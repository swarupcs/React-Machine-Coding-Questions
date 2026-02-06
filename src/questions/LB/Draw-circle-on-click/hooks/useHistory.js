import { useState } from 'react';

export const useHistory = () => {
  const [present, setPresent] = useState([]);
  const [past, setPast] = useState([]);

  const add = (item) => {
    setPresent((prev) => [...prev, item]);
    setPast([]); // clear redo stack on new action
  };

  const undo = () => {
    setPresent((prev) => {
      if (prev.length === 0) return prev;
      const newPresent = [...prev];
      const last = newPresent.pop();
      setPast((p) => [...p, last]);
      return newPresent;
    });
  };

  const redo = () => {
    setPast((prev) => {
      if (prev.length === 0) return prev;
      const newPast = [...prev];
      const last = newPast.pop();
      setPresent((p) => [...p, last]);
      return newPast;
    });
  };

  const reset = () => {
    setPresent([]);
    setPast([]);
  };

  return {
    present,
    past,
    add,
    undo,
    redo,
    reset,
  };
};
