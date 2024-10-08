"use strict";

import Express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import cors package

import Routes from "./api/routes";
import startServer from "./startServer";

const app = new Express();

//added cors to avoid cors error
app.use(cors());

// Support parsing of application/json type post data
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Routes
Routes.init(app);

// Start Server
startServer(app);

module.export = app;
