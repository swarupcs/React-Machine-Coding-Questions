export const countries = [
  { value: "in", label: "India" },
  { value: "us", label: "USA" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "jp", label: "Japan" },
];

export const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i}`,
}));
