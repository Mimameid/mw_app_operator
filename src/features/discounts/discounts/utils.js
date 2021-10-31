export function getDiscountStatus(item) {
  const timestamp = new Date().setHours(0, 0, 0, 0);

  if (item.date.endDate < timestamp) {
    return { color: 'error.main', statusText: 'abgelaufen' };
  }

  if (item.date.startDate > timestamp) {
    return { color: 'info.main', statusText: 'angesetzt' };
  }

  return { color: null, statusText: null };
}
