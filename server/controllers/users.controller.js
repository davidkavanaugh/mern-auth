const User = require("../models/users.model");
const { GetUserIdFromJWT } = require("../config/jwt.config.js");
module.exports = {
  getAll: async (req, res) => {
    console.log("getting all users");
    try {
      const allUsers = await User.find();
      return res
        .status(200)
        .json({ message: "get all successful", users: allUsers });
    } catch (err) {
      return res.status(500).json({ name: err.name, message: err.message });
    }
  },
  getById: async (req, res) => {
    console.log("getting user");
    try {
      const userId = await GetUserIdFromJWT(req.headers.authorization.slice(7));
      const userDocument = await User.findById(userId);
      return res.status(200).json({ user: userDocument });
    } catch (err) {
      return res.status(500).json({ name: err.name, message: err.message });
    }
  },
};
