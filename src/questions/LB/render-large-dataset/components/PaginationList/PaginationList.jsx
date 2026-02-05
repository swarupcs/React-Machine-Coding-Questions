import { useState } from "react";
import { generateProducts } from "../../data/generateData";
import "./pagination.css";

const products = generateProducts(500);

export default function PaginationList() {
  const LIMIT = 20;
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * LIMIT;
  const endIndex = page * LIMIT;

  const currentItems = products.slice(startIndex, endIndex);

  const hasPrev = page > 1;
  const hasNext = endIndex < products.length;

  return (
    <div>
      <h2>📌 Pagination Example</h2>

      <div className="grid">
        {currentItems.map((item) => (
          <div key={item.id} className="card">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="controls">
        {hasPrev && <button onClick={() => setPage(page - 1)}>Prev</button>}
        {hasNext && <button onClick={() => setPage(page + 1)}>Next</button>}
      </div>
    </div>
  );
}
