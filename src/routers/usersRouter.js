const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const checkLogin = require("../utils/checkLogin");
const authorize = require("../utils/authorize");
const upload = require("../utils/multerImg");

router.post("/changeUser/:_id", upload, checkLogin, UsersController.changeUser);
router.get("/updateUser/:_id", checkLogin, UsersController.updateUser);
router.get("/find", checkLogin, UsersController.Find);
router.get("/logout", checkLogin, UsersController.logout);
router.post("/dn", UsersController.dn);
router.get("/login", UsersController.login);
router.post("/dk", UsersController.dk);
router.get("/register", UsersController.register);
router.get("/", UsersController.index);

module.exports = router;
