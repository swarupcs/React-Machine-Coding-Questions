export const elementsOverlap = (a, b) => {
  return !(
    a.top > b.bottom ||
    a.bottom < b.top ||
    a.left > b.right ||
    a.right < b.left
  );
};
