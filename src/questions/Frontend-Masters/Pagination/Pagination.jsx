import "./Pagination.css"
import { useState } from 'react';

const PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;
const MAX_BUTTON_DISPLAY = 5;

function Pagination({
  loading,
  data,
  totalNumberOfPages = null,
  renderRow,
  rowPerPageSize = PAGE_SIZE,
  className = '',
  onPageChange = () => {},
}) {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(rowPerPageSize);

  const startIndex = totalNumberOfPages ? 0 : (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const visibleData = data.slice(startIndex, endIndex);

  const totalPages = totalNumberOfPages ?? Math.ceil(data.length / pageSize);

  const pageNumberButtons = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const maxButtons = 5;
  let buttonsStartIndex = currentPage - Math.floor(maxButtons / 2);
  let buttonsEndIndex = currentPage + Math.floor(maxButtons / 2);

  // Handle case where start index is less than 1
  if (buttonsStartIndex < 1) {
    buttonsStartIndex = 1;
    buttonsEndIndex = Math.min(totalPages, maxButtons);
  }

  // Handle case where end index exceeds total pages
  if (buttonsEndIndex > totalPages) {
    buttonsEndIndex = totalPages;
    buttonsStartIndex = Math.max(1, totalPages - maxButtons + 1);
  }

  // Get the buttons to display
  const buttonsToDisplay = pageNumberButtons.slice(
    buttonsStartIndex - 1,
    buttonsEndIndex
  );

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  }

  return (
    <div className={`pagination ${className}`}>
      {!loading && (
        <div className='pagination-content'>
          {visibleData.map((d) => {
            return <div key={d}>{renderRow(d)}</div>;
          })}
        </div>
      )}
      {loading && <div>Loading...</div>}
      <div className='pagination-footer'>
        <select onChange={(e) => setPageSize(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {buttonsToDisplay.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={currentPage === pageNumber}
              style={{
                color: '#fff',
                backgroundColor: currentPage === pageNumber ? 'red' : '',
              }}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Pagination;
