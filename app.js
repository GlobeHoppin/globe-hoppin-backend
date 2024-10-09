"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors package

const Routes = require("./api/routes");
const startServer = require("./startServer");

const app = express();

// Added cors to avoid cors error
app.use(cors());

// Support parsing of application/json type post data
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Routes
Routes.init(app);

// Start Server
startServer(app);

module.exports = app;