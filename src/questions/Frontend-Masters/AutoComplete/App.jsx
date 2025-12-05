import { useEffect, useState } from 'react';
import './App.css';
import AutoComplete from './components/AutoComplete';


const Suggestions = ['Apple', 'Mango', 'Banana', 'Kiwi', 'Grapes'];

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    new Promise((resolve) => {
      setTimeout(() => {
        resolve(Suggestions);
      }, 3000);
    }).then((data) => {
      setSuggestions(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <AutoComplete suggestions={suggestions} isLoading={isLoading} />
    </>
  );
}

export default App;
