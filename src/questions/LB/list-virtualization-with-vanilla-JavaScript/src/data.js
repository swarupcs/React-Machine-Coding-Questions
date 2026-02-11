export function generateItems(count = 10000) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    description: `This is item number ${i + 1}`,
  }));
}
