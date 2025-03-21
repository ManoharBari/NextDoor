const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
  headers: true,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = apiLimiter;
