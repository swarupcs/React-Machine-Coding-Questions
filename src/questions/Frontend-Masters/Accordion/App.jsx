import './App.css';
import Accordion from './components/Accordion';



function App() {
  return (
    <>
      <Accordion heading='Learning React'>
        <div>
          <h1>My Content here</h1>
          <h1>My Content here</h1>
          <h1>My Content here</h1>
          <h1>My Content here</h1>
          <h1>My Content here</h1>
        </div>
      </Accordion>

      <details>
        <summary>Learning React</summary>
        <div>
          <h1>My Content here</h1>
          <h1>My Content here</h1>
          <h1>My Content here</h1>
          <h1>My Content here</h1>
          <h1>My Content here</h1>
        </div>
      </details>
    </>
  );
}

export default App;
