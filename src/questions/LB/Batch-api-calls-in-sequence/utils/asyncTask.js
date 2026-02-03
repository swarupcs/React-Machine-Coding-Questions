// Mimics an API call that resolves after 1 second
export const asyncTask = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Completing ${id}`);
    }, 1000);
  });
};
