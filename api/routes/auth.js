const Express = require("express");
const {logout, signin, signup, verifyEmail }=require("../controller");
const AuthRouter = new Express.Router();


AuthRouter.post("/signup", signup);
AuthRouter.post("/signin", signin);
// will use this once we start sending verification email
AuthRouter.get("/verify/:token", verifyEmail);
AuthRouter.post("/logout", logout);

module.exports = AuthRouter;
