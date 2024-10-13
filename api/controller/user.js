const User = require("../model/user");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("pins");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getUserProfile };