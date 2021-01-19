const User = require("../models/users.model");

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
};
