export function calculateWPM(text, startTime, endTime) {
  const wordCount = text.trim().split(/\s+/).length;

  const timeInMinutes = (endTime - startTime) / 1000 / 60;

  if (timeInMinutes === 0) return 0;

  return Math.round(wordCount / timeInMinutes);
}
