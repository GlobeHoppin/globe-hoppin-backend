import mongoose from "mongoose";

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

const CONNECTION_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.8ysl0ky.mongodb.net/${MONGO_DBNAME}`;
//@cluster0.8ysl0ky.mongodb.net
const mongoConnect = async () => {
  console.log("[Connection] Connecting to DB...");
  await mongoose.connect(CONNECTION_URI, CONFIG.OPTIONS);
};

const MONGO_CONFIG = { CONFIG, mongoConnect };

module.exports = MONGO_CONFIG;
