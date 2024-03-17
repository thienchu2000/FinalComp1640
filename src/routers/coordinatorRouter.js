const express = require("express");
const CoordinatorController = require("../controllers/CoordinatorController");
const router = express.Router();
const checkLogin = require("../utils/checkLogin");
const { isMarketing_Coordinator } = require("../utils/authorize");

router.post("/comment/:articlesId ", CoordinatorController.comment);
router.get(
  "/",
  checkLogin,
  isMarketing_Coordinator,
  CoordinatorController.index
);
module.exports = router;
