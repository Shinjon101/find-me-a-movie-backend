import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Return rate limit info in the headers
  legacyHeaders: false,
});
