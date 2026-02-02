/**
 * Returns pages to render with ellipsis
 */
const getPages = (currentPage, totalPages) => {
  if (totalPages === 1) return [1];

  const pages = [];
  const firstPage = 1;
  const lastPage = totalPages;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  pages.push(firstPage);

  if (Math.abs(firstPage - prevPage) > 1) {
    pages.push("...");
  }

  if (prevPage > firstPage) {
    pages.push(prevPage);
  }

  if (currentPage !== firstPage && currentPage !== lastPage) {
    pages.push(currentPage);
  }

  if (nextPage < lastPage) {
    pages.push(nextPage);
  }

  if (Math.abs(nextPage - lastPage) > 1) {
    pages.push("...");
  }

  pages.push(lastPage);

  return pages;
};

export default getPages;
