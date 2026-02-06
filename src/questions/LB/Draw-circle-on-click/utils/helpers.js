export const DIAMETER = 50;

export const COLORS = ['red', 'blue', 'green', 'orange', 'purple'];

export function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
