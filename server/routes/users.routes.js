const router = require("express").Router();
const { authenticate } = require("../config/jwt.config");
const UsersController = require("../controllers/users.controller");

router.get("/", authenticate, UsersController.getAll);

module.exports = router;
