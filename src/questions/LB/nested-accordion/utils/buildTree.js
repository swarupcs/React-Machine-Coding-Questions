export const buildTree = (list) => {
  const map = {};
  const roots = [];

  // Create lookup map
  list.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  // Build tree
  list.forEach((item) => {
    if (item.parentId === null) {
      roots.push(map[item.id]);
    } else {
      map[item.parentId]?.children.push(map[item.id]);
    }
  });

  return roots;
};
