

export function timeAgo(timestamp) {
  const currentDate = new Date();
  const postDate = new Date(timestamp);


  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - postDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);


  // Calculate remaining hours and minutes
  const remainingHours = hours - days * 24;
  const remainingMinutes = minutes - hours * 60;


  // Format the result
  if (years > 0) {
    return years === 1 ? "1y ago" : `${years}y ago`;
  } else if (months > 0) {
    return months === 1 ? "1mo ago" : `${months}mo ago`;
  } else if (weeks > 0) {
    return weeks === 1 ? "1w ago" : `${weeks}w ago`;
  } else if (days > 0) {
    if (remainingHours > 4) {
      if (remainingMinutes > 10) {
        return `${days + 1}d ago`;
      } else {
        return `${days}d ago`;
      }
    } else {
      return days === 1 ? "1d " : `${days}d ago`;
    }
  } else if (hours > 0) {
    if (remainingMinutes > 35) {
      return `${hours + 1}h ago`;
    } else {
      return hours === 1 ? "1h ago" : `${hours}h ago`;
    }
  } else if (minutes > 0) {
    return minutes === 1 ? "1m ago" : `${minutes}m ago`;
  } else {
    return seconds <= 1 ? "just now" : `${seconds}s ago`;
  }
}
