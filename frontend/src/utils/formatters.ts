/**
 * Format a currency amount in Indian Rupees
 */
export function formatCurrency(amount: number | bigint): string {
  const num = typeof amount === 'bigint' ? Number(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Format a timestamp (ms or ns bigint) to a readable date string
 */
export function formatDate(timestamp: number | bigint): string {
  const ms =
    typeof timestamp === 'bigint'
      ? Number(timestamp / BigInt(1_000_000))
      : timestamp;
  return new Date(ms).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Alias kept for backward compatibility — same as formatDate but includes time.
 */
export function formatDateTime(timestamp: number | bigint): string {
  const ms =
    typeof timestamp === 'bigint'
      ? Number(timestamp / BigInt(1_000_000))
      : timestamp;
  return new Date(ms).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a timestamp to a readable time string (e.g. "3:12 PM")
 */
export function formatTime(timestamp: number | bigint): string {
  const ms =
    typeof timestamp === 'bigint'
      ? Number(timestamp / BigInt(1_000_000))
      : timestamp;
  return new Date(ms)
    .toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase();
}

/**
 * Generate a unique ID string.
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Get a human-readable relative time string (e.g. "5m ago", "2h ago").
 */
export function getRelativeTime(timestamp: number | bigint): string {
  const ms =
    typeof timestamp === 'bigint'
      ? Number(timestamp / BigInt(1_000_000))
      : timestamp;
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

/**
 * Premium two-line time display for Home Collection cards.
 *
 * Returns:
 *   line1 — relative label  (e.g. "Scheduled in 42 minutes" / "Visited 2 hours ago")
 *   line2 — absolute time   (e.g. "Today • 3:12 PM")
 *
 * @param slotIso  ISO date string or ms timestamp for the scheduled slot
 */
export function formatPremiumTimeDisplay(slotIso: string | number): {
  line1: string;
  line2: string;
} {
  const slotMs =
    typeof slotIso === 'number' ? slotIso : new Date(slotIso).getTime();
  const now = Date.now();
  const diffMs = slotMs - now;
  const diffMinutes = Math.round(Math.abs(diffMs) / 60_000);
  const diffHours = Math.round(Math.abs(diffMs) / 3_600_000);

  // Absolute time string — "Today • 3:12 PM"
  const timeStr = new Date(slotMs)
    .toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase();
  const line2 = `Today • ${timeStr}`;

  let line1: string;
  if (diffMs >= 0) {
    // Future
    if (diffMinutes < 60) {
      line1 = `Scheduled in ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
    } else {
      line1 = `Scheduled in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    }
  } else {
    // Past
    if (diffMinutes < 60) {
      line1 = `Visited ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else {
      line1 = `Visited ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
  }

  return { line1, line2 };
}
