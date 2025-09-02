import { Ratelimit } from '@upstash/ratelimit';
import { createClient, kv } from '@vercel/kv';

const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, '10 s'), // 5 requests in 10 seconds
});

export default rateLimit;