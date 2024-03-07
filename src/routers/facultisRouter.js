const express = require("express");
const router = express.Router();
const FacultisController = require("../controllers/FacultisController");

router.get("/", FacultisController.index);

module.exports = router;
