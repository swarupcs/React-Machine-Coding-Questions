
  
  export default function HeaderFilterInput({
    field,
    filterType,
    filters,
    onFilterChange,
  }) {
    return (
      <div className="filter-input">
        {(() => {
          switch (filterType) {
            case 'string': {
              const filterData = filters[
                field
              ];
              return (
                <input
                  placeholder="Search..."
                  type="search"
                  value={filterData?.value || ''}
                  onChange={(event) => {
                    const newFilters = {
                      ...filters,
                      [field]: {
                        type: 'string',
                        value: event.target.value,
                      },
                    };
  
                    onFilterChange(newFilters);
                  }}
                />
              );
            }
            case 'range': {
              const filterData = filters[
                field
              ];
  
              return (
                <div className="filter-input--range">
                  <input
                    placeholder="Min"
                    type="number"
                    value={filterData?.min || ''}
                    onChange={(event) => {
                      const newFilters = {
                        ...filters,
                        [field]: {
                          ...filterData,
                          type: 'range',
                          min:
                            event.target.value !== ''
                              ? Number(event.target.value)
                              : null,
                        },
                      };
  
                      onFilterChange(newFilters);
                    }}
                  />
                  <input
                    placeholder="Max"
                    type="number"
                    value={filterData?.max || ''}
                    onChange={(event) => {
                      const newFilters = {
                        ...filters,
                        [field]: {
                          ...filterData,
                          type: 'range',
                          max:
                            event.target.value !== ''
                              ? Number(event.target.value)
                              : null,
                        },
                      };
  
                      onFilterChange(newFilters);
                    }}
                  />
                </div>
              );
            }
          }
        })()}
      </div>
    );
  }
  