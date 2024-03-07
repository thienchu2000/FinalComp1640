const express = require("express");
const router = express.Router();
const FacultisContronller = require("../contronllers/FacultisContronller");

router.get("/", FacultisContronller.index);

module.exports = router;
