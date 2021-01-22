const bcrypt = require("bcrypt");
const jwt = require("../config/jwt.config");
const { NotFoundError } = require("../errors");
const User = require("../models/users.model");

module.exports = {
  login: async (req, res) => {
    console.log("logging in user");
    try {
      // search for user in db
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        throw new NotFoundError("oops", {
          email: { message: "User Not Found" },
        });

      // check password against hashed in db
      const correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPassword)
        throw new NotFoundError("oops", {
          email: { message: "User Not Found" },
        });

      // issue jwt
      const userToken = await jwt.sign({ userId: user._id });
      // send jwt
      return res.json({ token: userToken });
    } catch (err) {
      return res.send(err);
    }
  },

  refresh: async (req, res) => {
    try {
      const userToken = await jwt.refresh(req);
      return res.json({ token: userToken });
    } catch (err) {
      console.log(err);
      res
        .status(401)
        .json({ statusCode: 401, error: err.name, message: err.message });
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
        .status(201)
        .json({ message: "registration successful", token: userToken });
    } catch (err) {
      return res.send(err);
    }
  },
};
