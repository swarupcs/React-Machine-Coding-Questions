import { useEffect, useState } from "react";
import Beer from "./Beer";

const API_URL = "https://api.punkapi.com/v2/beers";
const PER_PAGE = 25;

export default function App() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [beerName, setBeerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const makeApiCall = async () => {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams({
        page,
        per_page: PER_PAGE,
        ...(beerName && { beer_name: beerName }),
      });

      const response = await fetch(`${API_URL}?${query}`);
      const data = await response.json();

      if (!Array.isArray(data)) {
        setList([]);
      } else {
        setList(data);
      }
    } catch (err) {
      setError("Something went wrong");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever page or search term changes
  useEffect(() => {
    makeApiCall();
  }, [page, beerName]);

  return (
    <div className="App">
      <h1>Beer Search 🍺</h1>

      {/* Controls */}
      <div className="controls">
        <div>
          <label>Page: </label>
          <select
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Search beer name"
          value={beerName}
          onChange={(e) => {
            setPage(1); // reset page on new search
            setBeerName(e.target.value);
          }}
        />
      </div>

      {/* States */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && list.length === 0 && <p>No results found</p>}

      {/* Results */}
      <div className="list">
        {list.map((beer) => (
          <Beer key={beer.id} {...beer} />
        ))}
      </div>
    </div>
  );
}
