const User = require("../models/users.model");

const getAll = (request, response) => {
  console.log("getting all");
  User.find()
    .then((all) => response.json(all))
    .catch((err) => {
      response.json(err);
    });
};

module.exports = {
  getAll,
};
