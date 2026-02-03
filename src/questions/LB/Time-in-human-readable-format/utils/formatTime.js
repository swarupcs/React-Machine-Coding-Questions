// messages
const messages = {
  NOW: "just now",
  FEW_SECONDS: "a few secs ago",
  ONE_MINUTE: "a minute ago",
  MINUTES: "mins ago",
  HOURS: "hours ago",
  DAYS: "days ago",
  MONTHS: "months ago",
  YEARS: "years ago",
};

// time in seconds
const TIME = {
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 24 * 60 * 60,
  MONTH: 30 * 24 * 60 * 60,
  YEAR: 365 * 24 * 60 * 60,
};

const floor = (value) => Math.floor(value);

export const formatTime = (date) => {
  const now = Date.now();
  const then = +new Date(date);

  let diff = Math.abs(now - then) / 1000; // seconds

  if (diff < 10) {
    return messages.NOW;
  }

  if (diff < TIME.MINUTE) {
    return messages.FEW_SECONDS;
  }

  if (diff < TIME.MINUTE * 5) {
    return messages.ONE_MINUTE;
  }

  if (diff < TIME.HOUR) {
    return `${floor(diff / TIME.MINUTE)} ${messages.MINUTES}`;
  }

  if (diff < TIME.DAY) {
    return `${floor(diff / TIME.HOUR)} ${messages.HOURS}`;
  }

  if (diff < TIME.MONTH) {
    return `${floor(diff / TIME.DAY)} ${messages.DAYS}`;
  }

  if (diff < TIME.YEAR) {
    return `${floor(diff / TIME.MONTH)} ${messages.MONTHS}`;
  }

  return `${floor(diff / TIME.YEAR)} ${messages.YEARS}`;
};
