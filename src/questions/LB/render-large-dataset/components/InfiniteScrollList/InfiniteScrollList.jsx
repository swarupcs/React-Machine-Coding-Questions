import { useEffect, useState } from "react";
import { generateProducts } from "../../data/generateData";
import "./infinite.css";

const products = generateProducts(500);

export default function InfiniteScrollList() {
  const LIMIT = 20;
  const [page, setPage] = useState(1);

  const visibleItems = products.slice(0, page * LIMIT);

  useEffect(() => {
    const onScroll = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50;

      if (bottomReached) {
        setPage((prev) => {
          if (prev * LIMIT >= products.length) return prev;
          return prev + 1;
        });
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <h2>📌 Infinite Scroll Example</h2>

      <div className="grid">
        {visibleItems.map((item) => (
          <div key={item.id} className="card">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
