import './App.css';

import One from './assets/1.jpg';
import Two from './assets/2.jpg';
import Three from './assets/3.jpg';
import Four from './assets/4.jpg';
import Five from './assets/5.jpg';
import Carousel from './Carousel';



function App() {
  return (
    <div className='app'>
      <Carousel>
        <img id='slideImg0' src={One} />
        <img id='slideImg1' src={Two} />
        <img id='slideImg2' src={Three} />
        <img id='slideImg3' src={Four} />
        <img id='slideImg4' src={Five} />
      </Carousel>
    </div>
  );
}

export default App;
