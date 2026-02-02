import React, { useState } from "react";
import Accordion from "./Accordion";

const AccordionGroup = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {items.map((item, index) => (
        <Accordion
          key={index}
          id={String(index)}
          label={item.label}
          isOpen={openIndex === index}
          onChange={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        >
          {item.content}
        </Accordion>
      ))}
    </>
  );
};

export default AccordionGroup;
