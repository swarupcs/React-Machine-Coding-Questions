import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Accordion.module.css";

const Accordion = ({ isOpen, label, children, onChange, id }) => {
  const handleToggle = () => {
    onChange?.(!isOpen);
  };

  return (
    <div className={styles.wrapper}>
      {/* Toggle button (keyboard accessible) */}
      <button
        className={cx(styles.toggler, { [styles.active]: isOpen })}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        id={`accordion-${id}`}
      >
        {label}
      </button>

      {/* Panel */}
      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`accordion-${id}`}
        className={cx(styles.panel, { [styles.active]: isOpen })}
      >
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.node
};

Accordion.defaultProps = {
  isOpen: false
};

export default Accordion;
