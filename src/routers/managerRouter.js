const express = require("express");
const router = express.Router();
const ManagerController = require("../controllers/ManagerController");
const { isMarketing_manager } = require("../utils/authorize");

router.get("/getS", isMarketing_manager, ManagerController.getS);
router.post("/gusetCr", isMarketing_manager, ManagerController.gusetCr);
router.get("/gusetCrA", isMarketing_manager, ManagerController.gusetCrA);
router.get(
  "/downloaded/:idAr",
  isMarketing_manager,
  ManagerController.downloaded
);
router.get("/", isMarketing_manager, ManagerController.index);

module.exports = router;
