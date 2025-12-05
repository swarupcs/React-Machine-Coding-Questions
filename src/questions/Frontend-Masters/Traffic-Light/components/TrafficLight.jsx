import { useEffect, useState } from 'react';
import './TrafficLight.css';

function TrafficLight({ data }) {
  // data random

  const dataToShow = getSortedDisplayOrder(data);
  const dataInOrder = getSortedLightOrder(data);

  const [lightsInDisplayOrder, setLightsInDisplayOrder] = useState(dataToShow);
  const [lightsInOrder, setLightInOrder] = useState(dataInOrder);

  const [activeLight, setActiveLight] = useState(dataInOrder[0]);

  function getSortedDisplayOrder(randomOrder) {
    return randomOrder.toSorted(function (a, b) {
      return a.displayOrder - b.displayOrder;
    });
  }

  function getSortedLightOrder(randomOrder) {
    return randomOrder.toSorted(function (a, b) {
      return a.order - b.order;
    });
  }

  useEffect(() => {
    setTimeout(() => {
      // change the light

      // current Light 0 // next 1
      // current light 1 // next 2
      // current 2 // next 0
      // current 0 // next

      const currentLightIndex = lightsInOrder.findIndex(
        (l) => l.color === activeLight.color
      );
      const nextLightIndex = currentLightIndex + 1;

      const nextLight = lightsInOrder[nextLightIndex] ?? lightsInOrder[0];
      setActiveLight(nextLight);
    }, activeLight.time);
  }, [activeLight]);

  return (
    <div className='traffic-light'>
      {lightsInDisplayOrder.map((light) => {
        return (
          <Light
            key={light.color}
            color={light.color}
            activeColor={activeLight.color}
          />
        );
      })}
    </div>
  );
}

function Light({ color, activeColor }) {
  const opacity = color === activeColor ? 1 : 0.2;
  return <div style={{ backgroundColor: color, opacity }} className='light' />;
}

export default TrafficLight;
