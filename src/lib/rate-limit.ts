
import "server-only";

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

const bookingLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  prefix: "tn:booking:source:v1",
});

const globalLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  prefix: "tn:booking:global:v1",
});

export async function checkBookingRateLimit(
  identifier: string
) {
  // Protect total API traffic as well as each source.
  const global = await globalLimiter.limit("all");

  if (!global.success) {
    return { success: false, reset: global.reset };
  }

  const source = await bookingLimiter.limit(identifier);

  return {
    success: source.success,
    reset: source.reset,
  };
}
