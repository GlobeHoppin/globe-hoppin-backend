import Express from "express";
import {
  logout,
  signin,
  signup,
  createProfile,
  verifyEmail,
} from "../controller";
import { accessToken, validateToken } from "../middleware/auth";
const AuthRouter = new Express.Router();

AuthRouter.post("/signin", signin);
AuthRouter.post("/profile", accessToken, validateToken, createProfile);
AuthRouter.post("/signup", signup);
// will use this once we start sending verification email
AuthRouter.get("/verify/:token", verifyEmail);
AuthRouter.post("/logout", logout);

export default AuthRouter;
