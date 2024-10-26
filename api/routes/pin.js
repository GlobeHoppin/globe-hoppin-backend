import Express from "express";
import { checkAuthorisation, validatePin, validateToken, validateUpdatePin } from "../middleware";
import { checkAuthorisation, validateToken, validateUpdatePin } from "../middleware";
import { addNewPin, getPin, updateUserPin, deleteUserPin } from "../controller";
import { validatePin } from "../middleware/pin";

const PinRouter = new Express.Router();

// Create a new pin

PinRouter.post("/", validateToken, validatePin, addNewPin);
// Update a pin

PinRouter.put("/:id", validateToken, checkAuthorisation,validateUpdatePin, updateUserPin );
// Get a pin
PinRouter.get("/:id", validateToken, getPin);
// Delete a pin
PinRouter.delete("/:id", validateToken, checkAuthorisation, deleteUserPin);

export default PinRouter;
