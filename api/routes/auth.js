import Express from "express";
import {
  logout,
  signin,
  signup,
  createProfile,
  verifyEmail,
  validateProfile,
} from "../controller";
import { validateToken } from "../middleware/auth.js";
const AuthRouter = new Express.Router();

AuthRouter.post("/signin", signin);
AuthRouter.post("/profile", validateToken, validateProfile, createProfile);
AuthRouter.post("/signup", signup);
// will use this once we start sending verification email
AuthRouter.get("/verify/:token", verifyEmail);
AuthRouter.post("/logout", logout);

export default AuthRouter;
