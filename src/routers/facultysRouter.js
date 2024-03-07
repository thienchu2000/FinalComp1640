const express = require("express");
const router = express.Router();
const FacultysContronller = require("../contronllers/FacultysContronller");

router.get("/", FacultysContronller.index);

module.exports = router;
