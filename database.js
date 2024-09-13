const mongoose = require('mongoose')

// const {
//   MONGO_DBNAME = "globehoppin",
//   MONGO_HOSTS = "27017",
//   MONGO_USERNAME = "globehoppinmvp",
//   MONGO_PASSWORD = "tmKbaqRjAJi75wln",
//   MONGO_REPLICASET,
//   MONGO_READ_PREFERENCE,
//   MONGO_PEM_PATH = "",
//   MONGO_SERVER_IDENTITY_CHECK = "true",
// } = process.env;

// const REQUIRED_CONFIG = [
//   "MONGO_DBNAME",
//   "MONGO_HOSTS",
//   "MONGO_USERNAME",
//   "MONGO_PASSWORD",
// ];

// // REQUIRED_CONFIG.forEach((key) => {
// //   if (!process.env[key]) {
// //     console.error("[Error] Missing MongoDB Config:", key);
// //     return process.exit(1);
// //   }
// // });

const MONGO_DBNAME = process.env.MONGO_DBNAME
const MONGO_HOSTS = process.env.MONGO_HOSTS
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

const CONFIG = {};

const CONNECTION_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@globehoppin.6ydzn.mongodb.net/${MONGO_DBNAME}`;

const mongoConnect = async () => {
  console.log("[Connection] Connecting to DB...");
  await mongoose.connect(CONNECTION_URI, CONFIG.OPTIONS);
};

const MONGO_CONFIG = { CONFIG, mongoConnect };

module.exports = MONGO_CONFIG;
