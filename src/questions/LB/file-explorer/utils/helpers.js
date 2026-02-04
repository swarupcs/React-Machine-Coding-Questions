// Get children of a folder
export const getChildren = (items, parentId) => {
  return Object.values(items).filter(
    (item) => item.parentId === parentId
  );
};

// Build breadcrumb path
export const getBreadcrumbPath = (items, activeId) => {
  const path = [{ id: null, name: "Home" }];
  let currentId = activeId;

  while (currentId) {
    const item = items[currentId];
    if (!item) break;
    path.push({ id: item.id, name: item.name });
    currentId = item.parentId;
  }

  return path;
};
