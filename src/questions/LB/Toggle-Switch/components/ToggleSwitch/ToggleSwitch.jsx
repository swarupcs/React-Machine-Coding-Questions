import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = (
  {
    name,
    checked,
    defaultChecked,
    onChange,
    rounded,
    variant,
    className,
    checkedChildren,
    uncheckedChildren,
    innerRef
  }
) => {
  const [_checked, setChecked] = useState(
    defaultChecked || checked || false
  );

  const handleChange = (e) => {
    const value = e.target.checked;
    setChecked(value);

    onChange?.({
      name,
      checked: value
    });
  };

  return (
    <span className={cx(styles.wrapper, className)}>
      <span className={styles.switch}>
        <input
          type="checkbox"
          checked={_checked}
          onChange={handleChange}
          name={name}
          ref={innerRef}
        />

        {/* Slider overlay */}
        <span
          className={cx(
            styles.slider,
            styles[variant],
            { [styles.round]: rounded }
          )}
        />

        {/* Inner labels / icons */}
        <span
          className={cx(
            styles.children,
            styles.checked,
            { [styles.visible]: _checked }
          )}
        >
          {checkedChildren}
        </span>

        <span
          className={cx(
            styles.children,
            styles.unchecked,
            { [styles.visible]: !_checked }
          )}
        >
          {uncheckedChildren}
        </span>
      </span>
    </span>
  );
};

ToggleSwitch.propTypes = {
  name: PropTypes.string,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "success", "danger"]),
  checkedChildren: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]),
  uncheckedChildren: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]),
  innerRef: PropTypes.instanceOf(Element)
};

ToggleSwitch.defaultProps = {
  defaultChecked: false,
  checked: false,
  variant: "primary"
};

export default React.forwardRef((props, ref) => (
  <ToggleSwitch {...props} innerRef={ref} />
));
