const router = require("express").Router();
const UsersController = require("../controllers/users.controller");

router.post("/", UsersController.create);

module.exports = router;
