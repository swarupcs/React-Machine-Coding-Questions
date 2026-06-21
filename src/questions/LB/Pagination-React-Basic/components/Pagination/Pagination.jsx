import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.css';
import cx from 'classnames';

const Pagination = ({ perPage, current, onChange, totalItems }) => {
  //Get total no of pages needed
  const getTotalPages = () => {
    return Math.ceil(totalItems / perPage);
  };

  const next = () => {
    const total = getTotalPages();

    if (current < total) {
      const start = current * perPage;
      const end = (current + 1) * perPage;
      onChange && onChange({ start, end, current: current + 1 });
    }
  };

  const prev = () => {
    const total = getTotalPages();

    if (current > 1 && current <= total) {
      const start = (current - 2) * perPage;
      const end = (current - 1) * perPage;
      onChange && onChange({ start, end, current: current - 1 });
    }
  };

  const direct = (i) => {
    if (current !== i) {
      const start = (i - 1) * perPage;
      const end = i * perPage;
      onChange && onChange({ start, end, current: i });
    }
  };

  const total = getTotalPages();

  let links = [];
  for (let i = 1; i <= total; i++) {
    links.push(
      <li
        onClick={() => direct(i)}
        key={i}
        className={cx({ [styles.active]: current === i })}
      >
        {i}
      </li>,
    );
  }

  return (
    <ul className={styles.wrapper}>
      <li onClick={prev}>&lt;</li>
      {links}
      <li onClick={next}>&gt;</li>
    </ul>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  totalItems: 36,
  perPage: 5,
  current: 1,
};

export default Pagination;
