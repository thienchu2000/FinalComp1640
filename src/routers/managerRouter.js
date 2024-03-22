const express = require("express");
const router = express.Router();
const ManagerController = require("../controllers/ManagerController");
const { isMarketing_manager } = require("../utils/authorize");

router.get(
  "/downloaded/:idAr",
  isMarketing_manager,
  ManagerController.downloaded
);
router.get("/", isMarketing_manager, ManagerController.index);

module.exports = router;
