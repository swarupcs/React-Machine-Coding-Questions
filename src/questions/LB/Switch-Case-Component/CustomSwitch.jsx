import React, { Children } from 'react';

export const CustomSwitch = ({ children, value }) => {
  const cases = [];
  let defaultCase = null;

  Children.forEach(children, (child) => {
    if (!child) return;

    if (child.type.name === 'CustomCase') {
      const caseValue = child.props.value;

      if (typeof caseValue === 'function') {
        if (caseValue(value)) {
          cases.push(child);
        }
      } else if (caseValue === value) {
        cases.push(child);
      }
    }

    if (child.type.name === 'DefaultCase') {
      defaultCase = child;
    }
  });

  return cases.length > 0 ? cases : defaultCase;
};

export const CustomCase = ({ children }) => <>{children}</>;

export const DefaultCase = ({ children }) => <>{children}</>;
