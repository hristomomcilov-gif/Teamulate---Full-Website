/**
 * In-memory sliding-window rate limiter for public form endpoints.
 * Single-instance only; replace with a durable store alongside assumption A6.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Opportunistic cleanup to bound memory.
  if (hits.size > 10_000) hits.clear();
  return false;
}
