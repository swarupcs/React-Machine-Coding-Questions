import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // if cache is not empty
      if (cache[input]) {
        setResults(cache[input]);
        return;
      }
      const data = await fetch(
        'https://dummyjson.com/recipes/search?q=' + input
      );
      const json = await data.json();
      setResults(json?.recipes);
      setCache((prev) => ({
        ...prev,
        [input]: json?.recipes,
      }));
    };
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);

  console.log(results);

  return (
    <div>
      <h1>Autocomplete Search Bar</h1>
      <div>
        <input
          type='text'
          className='search-input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
      </div>
      {showResults && (
        <div className='results-container'>
          {results?.map((result) => (
            <div key={result.id} className='result-item'>
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
