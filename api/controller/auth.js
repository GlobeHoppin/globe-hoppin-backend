const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

import { createUser, getUser, updateUser } from "../model/user";

const secret = process.env.SECRET;

// Refresh Token 1day
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

// Access Token 1hr
const generateAccessToken = (access) => {
  const payload = {
    exp:
      Math.floor(Date.now() / 1000) + parseInt(process.env.ACCESS_TOKEN_EXPIRY),
    data: access,
  };
  try {
    return jwt.sign(payload, secret);
  } catch (error) {
    console.error("[Error] Failed to generate Access token:", error);
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
    const { email, password, confirmPassword } = body;

    if (!confirmPassword) {
      return res.status(400).json({ message: "Confirm Password Required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // UnSave Confirm Password
    const data = {
      email,
      password: hashedPassword,
    };

    const user = await createUser(data);

    const refreshToken = generateToken(user);
    const accessToken = generateAccessToken(email);
    return res.status(201).json({
      success: true,
      refreshToken: refreshToken,
      accessToken: accessToken,
    });
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

const createProfile = async (req, res) => {
  try {
    const {
      email,
      name,
      gender,
      age,
      country,
      phoneNumber,
      countryCode,
      description,
      socialMediaLink,
      profilePicture,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please Enter Email" });
    }

    if (
      (!name,
      !gender,
      !age,
      !country,
      !phoneNumber,
      !countryCode,
      !description,
      !socialMediaLink,
      !profilePicture)
    ) {
      return res.status(400).json({ message: "Please Fill All Fields" });
    }

    // Find the user by email
    const userData = await getUser({ email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user profile
    const updateData = await updateUser(
      userData._id,
      {
        $set: {
          name,
          gender,
          age,
          country,
          phoneNumber,
          countryCode,
          description,
          socialMediaLink,
          profilePicture,
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      updateData,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const {
      body: { email = "", password = "", phoneNumber = "" },
    } = req;

    let user;

    if (email) {
      user = await getUser({ email });
      if (!user) {
        return res.status(404).json({ error: "Incorrect email" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Incorrect password" });
      }
    } else if (phoneNumber) {
      user = await getUser({ phoneNumber });
      if (!user) {
        return res.status(404).json({ error: "Phone number not found" });
      }
    } else {
      return res.status(400).json({ error: "Email or Phone Number required" });
    }

    const token = generateToken(user);
    return res
      .status(200)
      .json({ success: true, message: `welcome back`, token });
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

export {
  generateToken,
  validateToken,
  signin,
  createProfile,
  signup,
  logout,
  verifyEmail,
};
