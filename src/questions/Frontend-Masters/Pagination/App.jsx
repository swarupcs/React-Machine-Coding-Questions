import { useEffect, useState } from 'react';
import "./App.css"
import Pagination from './Pagination';


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(Array.from({ length: 10 }, (_, i) => i + 1));
  }, []);

  function handlePageChange(pageNumber) {
    setLoading(true);
    console.log('pageNumber', pageNumber);
    setTimeout(() => {
      setLoading(false);
      setData(Array.from({ length: 10 }, (_, i) => i * pageNumber + 1));
    }, 3000);
  }

  return (
    <div>
      <Pagination
        loading={loading}
        totalNumberOfPages={100}
        data={data}
        onPageChange={handlePageChange}
        renderRow={function (rowData) {
          return <div>Hellow for App `{rowData}`</div>;
        }}
      />
    </div>
  );
}

export default App;
