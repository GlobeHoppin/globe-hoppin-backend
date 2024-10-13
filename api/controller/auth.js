const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { createUser, getUser } = require("../model/user");

const secret = process.env.SECRET;

const generateToken = (user) => {
  console.log(process.env.TOKEN_EXPIRY);
  const payload = {
    exp: Math.floor(Date.now() / 1000) + parseInt(process.env.TOKEN_EXPIRY),
    data: user,
  };
  try {
    return jwt.sign(payload, secret);
  } catch (error) {
    console.error("[Error] Failed to generate token:", error);
    throw error;
  }
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR", error);
    return false;
  }
};

const signup = async (req, res) => {
  try {
    const { body = {} } = req;
    const { password = "" } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    body.password = hashedPassword;
    const user = await createUser(body);
    const token = generateToken(user);
    return res.status(201).json({ token });
  } catch (error) {
    const { name, message, code } = error;
    let status = 500;
    let errors = {};
    let error_message = message;

    if (name === "ValidationError") {
      status = 400;
      errors = Object.keys(error.errors).reduce((errors, key) => {
        errors[key] = error.errors[key].message;
        return errors;
      }, {});
    } else if (name === "MongoError" && code === 11000) {
      status = 409;
      error_message = "Email already exists";
    }
    return res.status(status).json({ errors, message: error_message });
  }
};

const signin = async (req, res) => {
  try {
    const {
      body: { email = "", password = "" },
    } = req;
    const user = await getUser({ email });
    if (!user) {
      return res.status(404).json({ error: "Incorrect email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    const { name, message, code } = error;
    let status = 500;
    let errors = {};
    let error_message = message;

    if (name === "ValidationError") {
      status = 400;
      errors = Object.keys(error.errors).reduce((errors, key) => {
        errors[key] = error.errors[key].message;
        return errors;
      }, {});
    } else if (name === "MongoError" && code === 11000) {
      status = 409;
      error_message = "Email already exists";
    }
    return res.status(status).json({ errors, message: error_message });
  }
};

const logout = async (req, res) => {
  try {
    const {
      headers: { authorization = "", "x-access-token": xAccessToken = "" } = {},
    } = req;
    const token = xAccessToken || authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided", status: 401 });
    }
    const user = validateToken(token);
    if (!user) {
      return res.status(401).json({ message: "Invalid token", status: 401 });
    }
    // TODO: invalidate current token so it can't be used again
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return next(error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = validateToken(req.params.token);
    if (!user) {
      return res.status(401).json({ message: "Invalid token", status: 401 });
    }
    user.isVerified = true;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return next(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUser({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             http://${req.headers.host}/reset/${token}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await getUser({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ error: "Password reset token is invalid or has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { generateToken, validateToken, signin, signup, logout, verifyEmail, forgotPassword, resetPassword };