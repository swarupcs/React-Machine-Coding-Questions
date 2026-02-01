import { useState } from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';


export default function App() {
  const [mode, setMode] = useState('draw');
  const [selectedColor, setColor] =
    useState('black');

  return (
    <div className="app">
      <Canvas selectedColor={selectedColor} mode={mode} />
      <Toolbar
        selectedColor={selectedColor}
        onColorChange={setColor}
        mode={mode}
        onModeChange={setMode}
      />
    </div>
  );
}
