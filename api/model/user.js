import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    age: {
      type: Number,
      min: [0, "Age must be at least 0"],
      max: [120, "Age must be less than 120"],
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
      required: [true, "Password is required"]
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      // required: [true, "Phone number is required"],
      minlength: [10, "Phone number must be at least 10 digits long"],
    },
    countryCode: {
      type: String,
      // required: [true, "Country code is required"],
      match: [/^\+\d{1,3}$/, "Invalid country code format"], // Must start with + and digits
    },
    description: {
      type: String
    },
    socialMediaLinks: {
      type: Object,
      validate: {
        validator: function (socialMediaLinks) {
          const validKeys = ["facebook", "instagram", "twitter", "linkedin"];
          const valid = Object.keys(socialMediaLinks).every((key) =>
            validKeys.includes(key)
          );
          if (!valid) {
            return false;
          }

          const validUrls = Object.values(socialMediaLinks).every((url) =>
            /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i.test(
              url
            )
          );
          return validUrls;
        },
        message: "Invalid social media link",
      },
    },
    profilePicture: {
      type: String,
      // match: [/^https?:\/\/.+\.(jpg|jpeg|png)$/, "Invalid image URL"], // URL format for image
    },
    dateOfRegistration: {
      type: Date,
      default: Date.now,
    },
    preferences: {
      type: [String],
      enum: ["Adventure", "Relaxation", "Culture", "Nature"]
    },
    languages: {
      type: [String],
      default: ["English"],
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
    const user = await User.findOne(query, { ...select });
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

