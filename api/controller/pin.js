
import { createPin, deletePin, getPinById, updatePin } from "../model";
import User from "../model/user";

const addNewPin = async (req, res) => {
  const { body } = req;



  try {
    const user = req.user;

    const newPin = await createPin(body, user._id);

    await User.findByIdAndUpdate(user._id, { $push: { pins: newPin._id } });

    return res.status(201).json({ newPin });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("Mongoose validation error:", error.errors);
      return res.status(400).json({
        message: "Validation failed while creating pin",
        errors: error.errors,
      });
    } else if (error.name === "CastError") {
      console.error("Mongoose cast error:", error.message);
      return res.status(400).json({
        message: "Invalid data type or format",
        error: error.message,
      });
    } else if (error.code === 11000) {
      console.error("Duplicate key error:", error.message);
      return res.status(409).json({
        message:
          "Duplicate key error: A record with this information already exists",
        error: error.message,
      });
    } else {
      console.error("Unexpected error occurred:", error);
      return res.status(500).json({
        message: "An unexpected error occurred while creating the pin",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  }
};

const updateUserPin = async (req, res) => {

  const {
    params: { id },
    body,
  } = req;

  try {
    const user = req.user;

    const pin = await getPinById(id);

    if (!pin) {
      console.error(`Pin not found with ID: ${id}`);
      return res.status(404).json({ message: "Pin not found" });
    }

    if (pin.user.toString() !== user._id.toString()) {
      console.error(
        `User ${user._id} attempted to update a pin they do not own`
      );
      return res.status(403).json({
        message: "Forbidden: You do not have permission to update this pin.",
      });
    }

    const updatedPin = await updatePin(id, body);
    console.log(`Pin updated successfully: ${updatedPin._id}`);
    return res.status(200).json({ updatedPin });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("Mongoose validation error:", error.errors);
      return res.status(400).json({
        message: "Validation failed while updating the pin",
        errors: error.errors,
      });
    } else if (error.name === "CastError") {
      console.error("Mongoose cast error:", error.message);
      return res.status(400).json({
        message: "Invalid data type or format",
        error: error.message,
      });
    } else {
      console.error("Unexpected error occurred:", error);
      return res.status(500).json({
        message: "An unexpected error occurred while updating the pin",
        error: error.message,
      });
    }
  }
};

const getPin = async (req, res) => {

  const {
    params: { id },
  } = req;


  try {
    const pin = await getPinById(id);
    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }
    return res.status(200).json({ pin });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Failed to retrieve pin", error: error.message });
  }
};

const deleteUserPin = async (req, res) => {

  const { params: { id } } = req;


  try {
    const user = req.user;
    const deletedPin = await deletePin(id);
    if (!deletedPin) {
      return res.status(404).json({ message: "Pin not found" });
    }
    if (deletedPin.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You do not have permission to delete this pin.",
        });
    }

    await User.findByIdAndUpdate(user._id, { $pull: { pins: deletedPin._id } });
    return res
      .status(200)
      .json({ message: "Pin deleted successfully", deletedPin });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to delete pin", error: error.message });

  }
};

export { addNewPin, updateUserPin, getPin, deleteUserPin };
