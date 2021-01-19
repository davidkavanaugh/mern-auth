const User = require("../models/users.model");

const create = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json({ message: "success", user: user });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  create,
};
