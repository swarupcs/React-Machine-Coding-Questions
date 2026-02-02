import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Pagination.module.css";
import getPages from "./getPages";

const Pagination = ({ totalItems, perPage, current, onChange }) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === current) return;

    const start = (page - 1) * perPage;
    const end = page * perPage;

    onChange?.({ start, end, current: page });
  };

  const prev = () => goToPage(current - 1);
  const next = () => goToPage(current + 1);

  const pages = getPages(current, totalPages);

  return (
    <ul className={styles.wrapper}>
      <li onClick={prev} className={styles.nav}>
        &lt;
      </li>

      {pages.map((page, idx) => (
        <li
          key={page + idx}
          className={cx(styles.page, {
            [styles.active]: page === current,
            [styles.disabled]: page === "..."
          })}
          onClick={() => typeof page === "number" && goToPage(page)}
        >
          {page}
        </li>
      ))}

      <li onClick={next} className={styles.nav}>
        &gt;
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

Pagination.defaultProps = {
  current: 1
};

export default Pagination;
