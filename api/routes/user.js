import Express from "express";
import { checkAuthorisation, validateToken } from "../middleware/auth";
import { getUserProfile, getUserProfileById, updateUserController } from "../controller";  // Import the new controller


const UserRouter = new Express.Router();

// Route to get the profile of the logged-in user
UserRouter.get("/", validateToken, getUserProfile);

// Route to get the profile of a user by ID
// UserRouter.get("/:id", validateToken, getUserProfileById);  // New route

// Route to update the profile of a user by ID
UserRouter.post("/:id", validateToken, checkAuthorisation, updateUserController)

export default UserRouter;
