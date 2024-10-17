import mongoose from "mongoose";

// Define the UserProfile schema with validation rules
const UserProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    age: {
      type: Number,
    },
    country: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email format is invalid"], // Email format validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    confirmPassword: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      minlength: [10, "Phone number must be at least 10 digits long"],
    },
    countryCode: {
      type: String,
    },
    description: {
      type: String,
    },
    socialMediaLink: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    dateOfRegistration: {
      type: Date,
      default: Date.now,
    },
    preferences: {
      type: String,
      enum: ["Adventure", "Relaxation", "Culture", "Nature"],
      default: "Adventure",
    },
    language: {
      type: String,
      default: "English",
    },

    recentActivity: Date,
    // Relationship: User has many pins (array of ObjectIds referencing Pin collection)
    pins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pin" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserProfileSchema);

export default User;

// Get all users
export const getAllUsers = async (query = {}, select = {}) => {
  try {
    const users = await User.find(query, select).sort({ createdAt: -1 });
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get a single user
export const getUserById = async (id, select = {}) => {
  try {
    const user = await User.findById(id, select);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get a single user
export const getUser = async (query, select = {}) => {
  try {
    const user = await User.findOne(query, select);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Create a new user
export const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Update a user
export const updateUser = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await User.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

