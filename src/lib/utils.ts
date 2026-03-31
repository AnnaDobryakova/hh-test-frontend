export function formatPrice(value: number) {
  return `${value} ₽`;
}

export function getDiscountPercent(fullPrice: number, price: number) {
  if (!fullPrice || fullPrice <= 0) return 0;
  return Math.round(((fullPrice - price) / fullPrice) * 100);
}

export function getTimerString(totalSeconds: number) {
  const safeSeconds = Math.max(totalSeconds, 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}