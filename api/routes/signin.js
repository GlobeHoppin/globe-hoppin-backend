import Express from "express";
import User, { createUser, getUser } from "../model/user";
const SigninRouter = new Express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.SECRET;

const generateToken = (user) => {
  const payload = {
    exp: Date.now() + 60 * 60 * 1000,
    data: user,
  };
  return jwt.sign(payload, secret);
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    if (decoded.exp < Date.now()) {
      return false;
    }
    return decoded.data;
  } catch (error) {
    return false;
  }
};

SigninRouter.post("/signup", async (req, res, next) => {
  try {
    const {
      body: { password = "" },
    } = req;
    const hashedPassword = await bcrypt.hash(password, 10);
    body.password = hashedPassword;
    const user = await createUser(body);
    const token = generateToken(user);
    return res.status(201).json({ token });
  } catch (error) {
    return next(error);
  }
});

SigninRouter.post("/signin", async (req, res) => {
  try {
    const {
      body: { email = "", password = "" },
    } = req;
    const user = await getUser({ email });
    if (!user) {
      return next({ message: "User not found", status: 404 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(200).json({ token });
  }
});

SigninRouter.get("/verify/:token", async (req, res, next) => {
  try {
    const user = validateToken(req.params.token);
    if (!user) {
      return next({ message: "Invalid token", status: 401 });
    }
    user.isVerified = true;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return next(error);
  }
});

SigninRouter.post("/logout", async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
      return next({ message: "No token provided", status: 401 });
    }
    const user = validateToken(token);
    if (!user) {
      return next({ message: "Invalid token", status: 401 });
    }
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return next(error);
  }
});

export default SigninRouter;
