
const express = require("express");
const { validateToken } = require("../middleware/auth");
const { getUserProfile } = require("../controller");

const UserRouter = express.Router();

UserRouter.get("/", validateToken, getUserProfile);

module.exports = UserRouter;