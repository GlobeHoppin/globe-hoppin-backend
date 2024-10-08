import MONGO_CONFIG from "./database";

const PORT = process.env.PORT || 3000;

const startServer = async (app) => {
  try {
    // Connect to MongoDB
    await MONGO_CONFIG.mongoConnect();
    await app.listen(PORT);
    console.log(
      `[Info] Server Started Successfully! Listening on Port: ${PORT}`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default startServer
