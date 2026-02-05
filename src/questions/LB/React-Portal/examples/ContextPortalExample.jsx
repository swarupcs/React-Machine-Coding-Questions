import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom";

const ThemeContext = createContext("light");

function PortalChild() {
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "10px",
        background: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      Portal Theme: {theme}
    </div>
  );
}

export default function ContextPortalExample() {
  return (
    <ThemeContext.Provider value="dark">
      <h3>Context Preservation Example</h3>

      {ReactDOM.createPortal(
        <PortalChild />,
        document.body
      )}
    </ThemeContext.Provider>
  );
}
