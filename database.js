import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const {
  MONGO_DBNAME = "",
  MONGO_HOSTS = "",
  MONGO_USERNAME = "",
  MONGO_PASSWORD = "",
  MONGO_REPLICASET,
  MONGO_READ_PREFERENCE,
  MONGO_PEM_PATH = "",
  MONGO_SERVER_IDENTITY_CHECK = "true",
} = process.env;

const REQUIRED_CONFIG = [
  "MONGO_DBNAME",
  "MONGO_HOSTS",
  "MONGO_USERNAME",
  "MONGO_PASSWORD",
];

// REQUIRED_CONFIG.forEach((key) => {
//   if (!process.env[key]) {
//     console.error("[Error] Missing MongoDB Config:", key);
//     return process.exit(1);
//   }
// });

const CONFIG = {};

const CONNECTION_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTS}/${MONGO_DBNAME}`;

//@cluster0.8ysl0ky.mongodb.net
const mongoConnect = async () => {
  try {
    await mongoose.connect(CONNECTION_URI, CONFIG.OPTIONS);

    mongoose.connection.on("connected", () => {
      console.log("[Connection] Successfully connected to MongoDB!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("[Connection] Error connecting to MongoDB:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("[Connection] MongoDB connection disconnected.");
    });
  } catch (error) {
    console.error("[Connection] MongoDB connection failed:", error);
    process.exit(1);
  }
};

mongoConnect()
  .then(() => {
    console.log("[Info] Server Started Successfully! Listening on Port: 8080");
  })
  .catch((err) => {
    console.error("[Error] Failed to start the server:", err);
  });

const MONGO_CONFIG = { CONFIG, mongoConnect };

module.exports = MONGO_CONFIG;
