import React, { useState } from "react";
import cx from "classnames";
import useDebounce from "../../hooks/useDebounce";
import styles from "./AutoComplete.module.css";

const ITEMS_API_URL = "https://demo.dataverse.org/api/search";
const DEBOUNCE_DELAY = 500;

const AutoComplete = ({ onChange, onSelectItem }) => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- Fetch Logic ---------------- */

  const fetchItems = async (searchTerm) => {
    if (!searchTerm) {
      setItems([]);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${ITEMS_API_URL}?q=${searchTerm}`);
      const json = await res.json();
      const results = json?.data?.items || [];

      setItems(results);
      onChange && onChange(results);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = useDebounce(fetchItems, DEBOUNCE_DELAY);

  /* ---------------- Handlers ---------------- */

  const onInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetch(value);
  };

  const onItemClick = (item) => {
    onSelectItem && onSelectItem(item);
    setQuery(item.name);
    setItems([]);
  };

  /* ---------------- Render ---------------- */

  return (
    <div className={styles.wrapper}>
      <div
        className={cx(styles.control, {
          [styles.isLoading]: isLoading
        })}
      >
        <input
          type="search"
          value={query}
          onChange={onInputChange}
          placeholder="Search..."
          className={styles.searchBox}
        />
      </div>

      {items.length > 0 && !isLoading && (
        <div className={styles.displayArea}>
          {items.map((item, index) => (
            <div
              key={item.name + index}
              className={styles.listItem}
              onClick={() => onItemClick(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}

      {error && <p className={styles.error}>Something went wrong</p>}
    </div>
  );
};

export default AutoComplete;
