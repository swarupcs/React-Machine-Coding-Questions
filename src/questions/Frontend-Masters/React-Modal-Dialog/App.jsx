// import "./index.css"
import './App.css';

import { useState } from 'react';
import Dialog from "./Dialog";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  return (
    <div className='app'>
      <button onClick={handleOpenDialog}>Open Dialog</button>
      {isDialogOpen && (
        <Dialog onClose={handleCloseDialog}>
          <h1>Memory Game</h1>
          <button className='save'>Save</button>
        </Dialog>
      )}
    </div>
  );
}

export default App;
