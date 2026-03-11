function formatCurrency(amount) {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
}
function formatDate(timestamp) {
  const ms = typeof timestamp === "bigint" ? Number(timestamp / BigInt(1e6)) : timestamp;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatTime(timestamp) {
  const ms = typeof timestamp === "bigint" ? Number(timestamp / BigInt(1e6)) : timestamp;
  return new Date(ms).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).toUpperCase();
}
function formatPremiumTimeDisplay(slotIso) {
  const slotMs = typeof slotIso === "number" ? slotIso : new Date(slotIso).getTime();
  const now = Date.now();
  const diffMs = slotMs - now;
  const diffMinutes = Math.round(Math.abs(diffMs) / 6e4);
  const diffHours = Math.round(Math.abs(diffMs) / 36e5);
  const timeStr = new Date(slotMs).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).toUpperCase();
  const line2 = `Today • ${timeStr}`;
  let line1;
  if (diffMs >= 0) {
    if (diffMinutes < 60) {
      line1 = `Scheduled in ${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
    } else {
      line1 = `Scheduled in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
    }
  } else {
    if (diffMinutes < 60) {
      line1 = `Visited ${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    } else {
      line1 = `Visited ${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    }
  }
  return { line1, line2 };
}
export {
  formatPremiumTimeDisplay as a,
  formatDate as b,
  formatCurrency as c,
  formatTime as f
};
