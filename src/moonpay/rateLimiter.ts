type Bucket = {
  tokens: number;
  lastRefillTimestamp: number;
};

interface RateLimiterConfig {
  capacity: number;
  refillRate: number;
}

export class RateLimiter {
  private buckets: Map<string, Bucket> = new Map();
  private capacity: number;
  private refillRate: number;

  constructor(config: RateLimiterConfig) {
    this.capacity = config.capacity;
    this.refillRate = config.refillRate;
  }

  tryConsume(userId: string): boolean {
    const now = Date.now();
    let bucket = this.buckets.get(userId);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefillTimestamp: now };
      this.buckets.set(userId, bucket);
    }

    // refill tokens based on elapsed time
    const elapsed = now - bucket.lastRefillTimestamp;
    const tokensToAdd = elapsed * this.refillRate;
    bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
    bucket.lastRefillTimestamp = now;

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true; // allowed
    }

    return false; // rate limit exceeded
  }
}
