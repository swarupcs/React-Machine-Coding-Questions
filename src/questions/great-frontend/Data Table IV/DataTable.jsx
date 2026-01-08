import { useState } from 'react';
import HeaderFilterInput, {
} from './HeaderFilterInput';





function filterData(data, filters) {
  return data.filter((row) =>
    Object.entries(filters)
      .map(([key, filterPayload]) => {
        // Note: Admittedly this is not-typesafe.
        const value = (row)[key];

        switch (filterPayload.type) {
          case 'string': {
            if (
              filterPayload.value == null ||
              filterPayload.value === ''
            ) {
              return true;
            }

            return (
              (value)
                .toLocaleLowerCase()
                .indexOf(
                  filterPayload.value.toLocaleLowerCase(),
                ) !== -1
            );
          }
          case 'range': {
            // Smaller than min value.
            if (
              filterPayload.min != null &&
              value < filterPayload.min
            ) {
              return false;
            }

            // Larger than max value.
            if (
              filterPayload.max != null &&
              value > filterPayload.max
            ) {
              return false;
            }

            return true;
          }
        }
      })
      .every((result) => result),
  );
}

function sortData(
  data,
  columns,
  field,
  direction,
) {
  const dataClone = data.slice();
  const comparator = columns.find(
    (column) => column.key === field,
  )?.comparator;

  if (comparator == null) {
    return dataClone;
  }

  return dataClone.sort((a, b) =>
    comparator(a, b, direction),
  );
}

function paginateData(
  data,
  page,
  pageSize,
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageData = data.slice(start, end);
  const maxPages = Math.ceil(data.length / pageSize);
  return { pageData, maxPages };
}

export default function DataTable({
  data,
  columns,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState(
    null,
  );
  const [sortDirection, setSortDirection] = useState('asc');
  const [filters, setFilters] = useState({});

  // Processing of data.
  const filteredData = filterData(data, filters);
  const sortedData = sortData(
    filteredData,
    columns,
    sortField,
    sortDirection,
  );
  const { maxPages, pageData } = paginateData(
    sortedData,
    page,
    pageSize,
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key, filterType }) => (
              <th key={key}>
                <button
                  onClick={() => {
                    if (sortField !== key) {
                      setSortField(key);
                      setSortDirection('asc');
                    } else {
                      setSortDirection(
                        sortDirection === 'asc'
                          ? 'desc'
                          : 'asc',
                      );
                    }
                    setPage(1);
                  }}>
                  {label}
                </button>
                {/* Filter inputs */}
                {filterType && (
                  <HeaderFilterInput
                    field={key}
                    filterType={filterType}
                    filters={filters}
                    onFilterChange={(newFilters) => {
                      setFilters(newFilters);
                      setPage(1);
                    }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.map((item) => (
            <tr key={item.id}>
              {columns.map(({ key, renderCell }) => (
                <td key={key}>{renderCell(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="pagination">
        <select
          aria-label="Page size"
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}>
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <div className="pages">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}>
            Prev
          </button>
          {maxPages === 0 ? (
            <span>0 pages</span>
          ) : (
            <span aria-label="Page number">
              Page {page} of {maxPages}
            </span>
          )}
          <button
            disabled={page === maxPages}
            onClick={() => {
              setPage(page + 1);
            }}>
            Next
          </button>
        </div>
      </div>
      {/* Filters state to help visualize */}
      <pre className="filter__debug">
        {JSON.stringify(filters, null, 2)}
      </pre>
    </div>
  );
}
