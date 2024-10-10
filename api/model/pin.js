import mongoose from "mongoose";

const PinSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: [true, "Latitude is required"],
      min: [-90, "Latitude must be between -90 and 90"],
      max: [90, "Latitude must be between -90 and 90"],
    },
    longitude: {
      type: Number,
      required: [true, "Longitude is required"],
      min: [-180, "Longitude must be between -180 and 180"],
      max: [180, "Longitude must be between -180 and 180"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    color: {
      type: String,
      match: [/^#[0-9A-F]{6}$/i, "Color must be in hex format (e.g., #FFFFFF)"],
      default: "#FFFFFF",
    },
    pinStyle: {
      type: String,
      default: "marker",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be longer than 500 characters"],
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
    tags: [{
      type: String,
      enum: [
        "travel", "food", "beach", "hiking", 
        "culture", "nightlife", "shopping", 
        "adventure", "relaxation",
      ],
      maxlength: [50, "Tag cannot be longer than 50 characters"],
    }],
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    visibility: {
      type: String,
      enum: ["public", "private", "shared"],
      default: "public",
    },
    photos: [{
      type: String,
      match: [/^https?:\/\/.+\.(jpg|jpeg|png)$/, "Invalid image URL"],
    }],
    pinCategory: {
      type: String,
      enum: ["Favorite", "Visited", "Wishlist"],
      default: "Visited",
    },
    travelDates: {
      startDate: {
        type: Date,
        required: [true, "Start date is required"],
      },
      endDate: {
        type: Date,
        required: [true, "End date is required"],
        validate: {
          validator: function (value) {
            return value >= this.travelDates.startDate;
          },
          message: "End date must be after the start date",
        },
      },
    },
    places: [{
      locationName: {
        type: String,
        required: [true, "Location name is required"],
      },
      address: {
        type: String,
        required: [true, "Address is required"],
      },
    }],
    images: [{ type: String }],
    memories: [{ type: String }],
    journal: { type: String },
  },
  { timestamps: true } 
);

const Pin = mongoose.model("Pin", PinSchema);

export default Pin;

export const createPin = async (pin, userId) => {
  try {
    const newPin = await Pin.create({ ...pin, user: userId });
    return newPin;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllPins = async (query = {}, select = []) => {
  const selectObj =
    select.length > 0
      ? select.reduce((obj, key) => {
          obj[key] = 1;
          return obj;
        }, {})
      : {};

  try {
    const pins = await Pin.find(query, selectObj).sort({ createdAt: -1 });
    return pins;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPinById = async (id, select = []) => {
  const selectObj =
    select.length > 0
      ? select.reduce((obj, key) => {
          obj[key] = 1;
          return obj;
        }, {})
      : {};

  try {
    const pin = await Pin.findById(id, selectObj);
    return pin;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePin = async (id, pinDataToUpdate) => {
  try {
    const updatedPin = await Pin.findByIdAndUpdate(id, pinDataToUpdate, {
      new: true,
    });
    return updatedPin;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deletePin = async (id) => {
  try {
    const deletedPin = await Pin.findByIdAndDelete(id);
    return deletedPin;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
