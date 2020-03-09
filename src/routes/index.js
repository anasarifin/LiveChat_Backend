const router = require("express").Router();
const users = require("./users");
const login = require("./login");

router.use("/", users);
router.use("/", login);

module.exports = router;
