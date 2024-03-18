const express = require("express");
const CoordinatorController = require("../controllers/CoordinatorController");
const router = express.Router();
const checkLogin = require("../utils/checkLogin");
const { isMarketing_Coordinator } = require("../utils/authorize");

router.put(
  "/updateAr/:articlesId ",
  isMarketing_Coordinator,
  CoordinatorController.updateAr
);
router.get("/", isMarketing_Coordinator, CoordinatorController.index);
module.exports = router;
