import { useEffect, useState } from 'react';
import './App.css';
import { PAGE_SIZE } from './constants';
import { ProductCard } from './components/ProductCard';
import { Pagination } from './components/Pagination';

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('https://dummyjson.com/products?limit=500');
        const json = await data.json();
        console.log(json.products);
        setProducts(json.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const gotoNextPage = () => {
    setCurrentPage((prevPage) => Math.min(noOfPages - 1, prevPage + 1));
  };

  return (
    <>
      <h1>Pagination</h1>
      {products.length === 0 ? (
        <h1> No Products Found</h1>
      ) : (
        <div className='product-container'>
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.thumbnail}
              title={product.title}
            />
          ))}
          <div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              noOfPages={noOfPages}
              goToPreviousPage={goToPreviousPage}
              gotoNextPage={gotoNextPage}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
