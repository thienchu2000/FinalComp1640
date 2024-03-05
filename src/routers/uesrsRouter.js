const express = require("express");
const router = express.Router();
const UsersContronller = require("../contronllers/UsersContronller");
const checkLogin = require("../utils/checkLogin");

router.get("/logout", UsersContronller.logout);
router.post("/login", checkLogin, UsersContronller.login);
router.post("/register", checkLogin, UsersContronller.register);
router.get("/", UsersContronller.index);

module.exports = router;
