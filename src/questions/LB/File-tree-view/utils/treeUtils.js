export const getChildren = (parentId, items) => {
  return Object.values(items).filter((item) => item.parentId === parentId);
};
