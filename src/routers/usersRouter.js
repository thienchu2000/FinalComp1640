const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const checkLogin = require("../utils/checkLogin");
const authorize = require("../utils/authorize");

router.get("/updateUser", UsersController.updateUser);
router.get("/find", UsersController.Find);
router.get("/logout", UsersController.logout);
router.post("/dn", UsersController.dn);
router.get("/login", UsersController.login);
router.post("/dk", UsersController.dk);
router.get("/register", UsersController.register);
router.get("/", UsersController.index);

module.exports = router;
