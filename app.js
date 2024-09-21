"use strict";

import Express from "express";
import bodyParser from 'body-parser'

import Routes from "./api/routes";
import startServer from "./startServer";
const app = new Express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Routes
Routes.init(app);

// Start Server
startServer(app);

// For testing
module.export = app;
