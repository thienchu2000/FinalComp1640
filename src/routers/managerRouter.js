const express = require("express");
const router = express.Router();
const ManagerController = require("../controllers/ManagerController");

router.get("/downloaded/:idAr", ManagerController.downloaded);
router.get("/", ManagerController.index);

module.exports = router;
