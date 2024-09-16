'use strict'

import Express from "express";
import Routes from "./api/routes";
import MONGO_CONFIG from "./database";
import startServer from "./startServer";
const app = new Express();
require("dotenv").config();

// Initialize Routes
Routes.init(app);

// Start Server
startServer(app);

// For testing
module.export = app