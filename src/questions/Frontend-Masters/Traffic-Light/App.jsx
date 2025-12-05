import './App.css';
import TrafficLight from './components/TrafficLight';


const TrafficLights = [
  {
    color: 'red',
    time: 2000, // 4sec
    order: 2,
    displayOrder: 3,
  },
  {
    color: 'yellow',
    time: 1000, // 4sec
    order: 3,
    displayOrder: 2,
  },
  {
    color: 'green',
    time: 2000, // 4sec
    order: 1,
    displayOrder: 1,
  },
  {
    color: 'aqua',
    time: 1000, // 4sec
    order: 2,
    displayOrder: 3,
  },
  {
    color: 'purple',
    time: 400, // 4sec
    order: 4,
    displayOrder: 1,
  },
];

function App() {
  return (
    <>
      <TrafficLight data={TrafficLights} />
    </>
  );
}

export default App;
