interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry>;
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 5, windowMs: number = 60 * 60 * 1000) {
    this.requests = new Map();
    this.limit = limit;
    this.windowMs = windowMs;
  }

  check(identifier: string): { success: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // Clean up expired entries periodically
    this.cleanup(now);

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      const resetTime = now + this.windowMs;
      this.requests.set(identifier, { count: 1, resetTime });
      return { success: true, remaining: this.limit - 1, resetTime };
    }

    if (entry.count >= this.limit) {
      // Rate limit exceeded
      return { success: false, remaining: 0, resetTime: entry.resetTime };
    }

    // Increment count
    entry.count++;
    this.requests.set(identifier, entry);
    return { success: true, remaining: this.limit - entry.count, resetTime: entry.resetTime };
  }

  private cleanup(now: number): void {
    // Clean up entries older than 2x the window
    const cutoff = now - this.windowMs * 2;
    for (const [key, entry] of this.requests.entries()) {
      if (entry.resetTime < cutoff) {
        this.requests.delete(key);
      }
    }
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

// 3 requests per hour per IP
export const contactRateLimiter = new RateLimiter(3, 60 * 60 * 1000);
