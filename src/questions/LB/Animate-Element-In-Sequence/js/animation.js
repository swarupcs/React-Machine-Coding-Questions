let styleSheet = null;

// Dynamically create CSS keyframes
const dynamicAnimation = (name, styles) => {
  if (!styleSheet) {
    styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    document.head.appendChild(styleSheet);
  }

  styleSheet.sheet.insertRule(
    `@keyframes ${name} { ${styles} }`,
    styleSheet.sheet.cssRules.length
  );
};
