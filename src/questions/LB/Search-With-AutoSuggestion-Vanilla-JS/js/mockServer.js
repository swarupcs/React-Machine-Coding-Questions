// Mock Server
const FAILURE_COUNT = 10;
const LATENCY = 200;

function getRandomBool(n) {
  const threshold = 1000;
  if (n > threshold) n = threshold;
  return Math.floor(Math.random() * threshold) % n === 0;
}

function getSuggestions(text) {
  const pre = "pre";
  const post = "post";
  const results = [];

  if (getRandomBool(2)) results.push(pre + text);
  if (getRandomBool(2)) results.push(text);
  if (getRandomBool(2)) results.push(text + post);
  if (getRandomBool(2)) results.push(pre + text + post);

  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COUNT)) {
        reject(new Error("Mock server failure"));
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}
