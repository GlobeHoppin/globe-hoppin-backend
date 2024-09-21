import { createPin } from "../model";
import User from "../model/user";

const addNewPin = async (req, res) => {
  const { body = {} } = req;
  try {
    const user = req.user;
    const newPin = await createPin(body);
    await User.findByIdAndUpdate(user._id, { $push: { pins: newPin.id } });
    return res.status(201).json({ newPin });
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

const updateUserPin = async (req, res) => {
  const {
    params: { id },
    body = {},
  } = req;
  try {
    const user = req.user;
    const updatedPin = await updatePin(id, body);
    if (!updatedPin) {
      return res.status(404).json({ error: "Pin not found" });
    }
    if (updatedPin.user.toString() !== user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.status(200).json({ updatedPin });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPin = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const pin = await getPinById(id);
    if (!pin) {
      return res.status(404).json({ error: "Pin not found" });
    }
    return res.status(200).json({ pin });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteUserPin = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = validateToken(req.headers["x-access-token"]);
    const deletedPin = await deletePin(id);
    if (!deletedPin) {
      return res.status(404).json({ error: "Pin not found" });
    }
    if (deletedPin.user.toString() !== user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await User.findByIdAndUpdate(user.id, { $pull: { pins: deletedPin.id } });
    return res.status(200).json({ deletedPin });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { addNewPin, updateUserPin, getPin, deleteUserPin };
