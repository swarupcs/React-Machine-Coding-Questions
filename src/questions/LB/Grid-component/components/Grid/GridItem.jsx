import cx from "classnames";

const GridItem = ({ size = 1, sm = 1, children }) => {
  return (
    <div className={cx("gridItem", `size-${size}`, `sm-size-${sm}`)}>
      {children}
    </div>
  );
};

export default GridItem;
