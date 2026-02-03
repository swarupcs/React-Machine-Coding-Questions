import React, { useRef } from "react";
import useSelectionText from "../hooks/useSelectionText";

const SelectionExample = () => {
  const contentRef = useRef(null);
  const data = useSelectionText(contentRef);

  return (
    <div className="page">
      {data.showTools && (
        <div
          className="popup"
          style={{
            top: `${data.y}px`,
            left: `${data.x + data.width / 2}px`,
          }}
        >
          🐦 Tweet
        </div>
      )}

      <div ref={contentRef} className="content">
        <p>
          There are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration in some form, by injected humour, or
          randomised words which don't look even slightly believable.
        </p>

        <p>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>

        <p>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged.
        </p>
      </div>
    </div>
  );
};

export default SelectionExample;
