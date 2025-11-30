import { useState } from 'react';
import './styles.css';


import StarRating from './StarRating';

export default function App() {
  const [rating, setRating] = useState(3);

  return (
    <div>
      <StarRating max={5} value={rating} onChange={setRating} />
    </div>
  );
}
