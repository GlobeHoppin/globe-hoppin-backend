import Express from "express";
import { checkAuthorisation, checkPinAuthorisation, validatePin, validateToken, validateUpdatePin } from "../middleware";
import { addNewPin, getPin, updateUserPin, deleteUserPin } from "../controller";

const PinRouter = new Express.Router();

// Create a new pin
PinRouter.post("/", validateToken, validatePin, addNewPin);
// Update a pin
PinRouter.post("/:id", validateToken, checkPinAuthorisation, updateUserPin );
// Get a pin
PinRouter.get("/:id", validateToken, getPin);
// Delete a pin
PinRouter.delete("/:id", validateToken, checkAuthorisation, deleteUserPin);

export default PinRouter;
