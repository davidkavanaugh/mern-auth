const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotFoundError } = require("../errors");
const User = require("../models/users.model");

module.exports = {
  login: async (req, res) => {
    console.log("logging in user");
    try {
      // search for user in db
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new NotFoundError("User not found");

      // check password against hashed in db
      const correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPassword) throw new NotFoundError("User not found");

      // issue jwt
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );

      // send jwt in cookie
      res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
          httpOnly: true,
        })
        .status(200)
        .json({ message: "login successful", token: userToken });
    } catch (err) {
      if (err instanceof NotFoundError) {
        return res.status(404).json({
          errors: {
            email: { name: err.name, message: err.message },
          },
        });
      } else return res.status(500).json(err);
    }
  },
  logout: (req, res) => {
    console.log("logging out user");
    try {
      return res
        .status(200)
        .clearCookie("usertoken")
        .json({ message: "logout successful" });
    } catch (err) {
      return res.status(500).json({ name: err.name, message: err.message });
    }
  },
  register: async (req, res) => {
    console.log("registering new user");
    try {
      const user = await User.create(req.body);
      // issue jwt
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );
      return res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
          httpOnly: true,
        })
        .status(201)
        .json({ message: "registration successful", token: userToken });
    } catch (err) {
      return res.send(err);
    }
  },
};
