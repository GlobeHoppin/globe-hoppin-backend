const Express = require("express");
const AuthRouter = Express.Router();
const {logout, signin, signup, verifyEmail, forgotPassword,resetPassword }=require("../controller/auth");

AuthRouter.post("/signup", signup);
AuthRouter.post("/signin", signin);
// will use this once we start sending verification email
AuthRouter.get("/verify/:token", verifyEmail);
AuthRouter.post("/logout", logout);
AuthRouter.post("/forgot-password", forgotPassword);
AuthRouter.post("/reset-password", resetPassword);


module.exports = AuthRouter;
