import { useEffect, useState } from "react";
import Circle from "./components/Circle/Circle";
import { elementsOverlap } from "./utils/collision";
import { getRandomColor } from "./utils/color";

const RADIUS = 100;
const DIAMETER = 200;

const App = () => {
  const [circles, setCircles] = useState([]);

  const drawCircle = (e) => {
    const { clientX, clientY } = e;

    setCircles((prevCircles) => {
      const currentCircle = {
        top: clientY - RADIUS,
        left: clientX - RADIUS,
        right: clientX - RADIUS + DIAMETER,
        bottom: clientY - RADIUS + DIAMETER,
        background: "red",
      };

      // Check collision with existing circles
      for (let i = 0; i < prevCircles.length; i++) {
        if (elementsOverlap(currentCircle, prevCircles[i])) {
          currentCircle.background = getRandomColor();
          break;
        }
      }

      return [...prevCircles, currentCircle];
    });
  };

  useEffect(() => {
    document.addEventListener("click", drawCircle);
    return () => document.removeEventListener("click", drawCircle);
  }, []);

  return (
    <>
      {circles.map((circle, index) => (
        <Circle key={index} {...circle} />
      ))}
    </>
  );
};

export default App;
