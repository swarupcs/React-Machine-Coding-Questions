import React from "react";
import AutoComplete from "../components/AutoComplete";

const AutoCompleteDemo = () => {
  return (
    <AutoComplete
      onChange={(items) => console.log("Suggestions:", items)}
      onSelectItem={(item) => console.log("Selected:", item)}
    />
  );
};

export default AutoCompleteDemo;
