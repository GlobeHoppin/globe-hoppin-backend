"use strict";

import Express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import cors package

// Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset
import Routes from "./api/routes";
import rateLimit from "express-rate-limit";
import startServer from "./startServer";

const app = new Express();

//added cors to avoid cors error
app.use(cors());

const limiter = rateLimit({
  windowMs: 1000, // 1 second window
  max: 5, // limit each IP to 5 requests per windowMs (adjust this as needed)
  message: "Too many requests from this IP, please try again after a second",
  headers: true, // Sends rate limit info in response headers
  handler: (req, res) => {
    // Custom error response
    return res.status(429).json({
      error: "Rate limit exceeded",
      message:
        "You have exceeded the number of allowed requests. Please try again later.",
    });
  },
});
// apply limit to all request
app.use(limiter);

// log the changes
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//   next();
// });

// Support parsing of application/json type post data
app.use(bodyParser.json());
// Rate limiting middleware

// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Routes
Routes.init(app);

// Start Server
startServer(app);

module.export = app;
