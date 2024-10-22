// Rate Limiting using Token bucket algorithm

// Maximum number of requests allowed in a given time frame
const REQUEST_LIMIT = 5;

// Time frame in milliseconds
const WINDOW_SIZE = 10000;

// Initialize with REQUEST_LIMIT number of tokens
const tokens = Array(REQUEST_LIMIT).fill(1);

var time = new Date().getTime();

export const rateLimiter = (req, res, next) => {
  if (tokens.length && new Date().getTime() - time < WINDOW_SIZE) {
    tokens.pop();
    next();
  } else {
    if (new Date().getTime() - time >= WINDOW_SIZE) {
      const len = tokens.length;
      for (let i = 0; i < 5 - len; i++) {
        tokens.push(1);
      }
      time = new Date().getTime();
      rateLimiter(req, res, next);
    } else {
      res.status(429).json({
        message: `You have exceeded the ${REQUEST_LIMIT} requests in ${WINDOW_SIZE} ms limit !! , ${
          new Date().getTime() - time
        }`,
        status: 429,
      });
    }
  }
};
