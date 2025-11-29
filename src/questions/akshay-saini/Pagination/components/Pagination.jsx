import React from 'react';

export const Pagination = ({
    currentPage,
    setCurrentPage,
    noOfPages,
    goToPreviousPage,
    gotoNextPage
}) => {
  return (
    <div className='pagination-container'>
      <button
        className='pageNumber'
        onClick={goToPreviousPage}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      {[...Array(noOfPages)].map((_, index) => (
        <button
          key={index}
          className={
            currentPage === index ? 'pageNumber active-page' : 'pageNumber'
          }
          onClick={() => setCurrentPage(index)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className='pageNumber'
        onClick={gotoNextPage}
        disabled={currentPage === noOfPages - 1}
      >
        Next
      </button>
    </div>
  );
};
