import React, { useState } from "react";
import Pagination from "../components/Pagination";

const PaginationDemo = () => {
  const [current, setCurrent] = useState(1);

  const onChange = ({ current }) => {
    setCurrent(current);
  };

  return (
    <div>
      <h3>Current Page: {current}</h3>

      <Pagination
        totalItems={43}
        perPage={7}
        current={current}
        onChange={onChange}
      />
    </div>
  );
};

export default PaginationDemo;
