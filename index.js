const Express = require("express");
const Routes = require("./api/routes");
const MONGO_CONFIG = require("./database");
const ServerlessHttp = require("serverless-http");
const app = new Express();
const handler = ServerlessHttp(app);
require("dotenv").config();

Routes.init(app);
const PORT = process.env.PORT || 8080;

const startServer = async (app) => {
  try {
    // Connect to MongoDB
    await MONGO_CONFIG.mongoConnect();
    console.log("[Info] DB Connected");

    await app.listen(PORT);
    console.log(
      `[Info] Server Started Successfully! Listening on Port: ${PORT}`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

startServer(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
