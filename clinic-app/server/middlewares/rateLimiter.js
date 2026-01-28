// /middlewares/rateLimiter.js
const { RateLimiterMemory } = require('rate-limiter-flexible');

const opts = {
  points: parseInt(process.env.RATE_LIMIT_POINTS || '100', 10), // # of points
  duration: parseInt(process.env.RATE_LIMIT_DURATION || '60', 10) // per duration in seconds
};
const rateLimiter = new RateLimiterMemory(opts);

exports.rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ message: 'Too many requests' }));
};
