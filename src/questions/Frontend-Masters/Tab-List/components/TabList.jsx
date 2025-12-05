import "./style.css";

import Button from "./button/button";
import { useState } from "react";

function TabList({ tabs, defaultSelection = 3, onChange = () => {} }) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelection);

  function handleTabChange(index) {
    return () => {
      setSelectedIndex(index);
      onChange(index);
    };
  }

  const Component = tabs[selectedIndex].Component;

  return (
    <div role="tablist">
      <div>
        {tabs.map((tab, index) => {
          return (
            <Button
              onClick={handleTabChange(index)}
              label={tab.label}
              key={tab.id}
              role="tab"
              aria-selected={index === selectedIndex}
              data-selected={index === selectedIndex}
            />
          );
        })}
      </div>
      <div role="tabpanel">
        <Component />
      </div>
    </div>
  );
}

export default TabList;
