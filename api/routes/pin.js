const express = require("express");
const { checkAuthorisation, validateToken } = require("../middleware");
const { addNewPin, getPin, updateUserPin, deleteUserPin } = require("../controller");

const PinRouter = express.Router();

// Create a new pin
PinRouter.post("/", validateToken, addNewPin);
// Update a pin
PinRouter.put("/:id", validateToken, checkAuthorisation, updateUserPin);
// Get a pin
PinRouter.get("/:id", validateToken, getPin);
// Delete a pin
PinRouter.delete("/:id", validateToken, checkAuthorisation, deleteUserPin);

module.exports = PinRouter;