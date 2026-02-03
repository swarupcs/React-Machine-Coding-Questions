// Break array into chunks of given size
export const chunkArray = (arr, size) => {
  const result = [];
  let index = 0;

  while (index < arr.length) {
    result.push(arr.slice(index, index + size));
    index += size;
  }

  return result;
};
