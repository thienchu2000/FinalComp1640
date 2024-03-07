const express = require("express");
const router = express.Router();
const ArticlesController = require("../contronllers/ArticlesContronller");

router.get("/readAss", ArticlesController.readAss);
router.post("/createAss", ArticlesController.createAss);
router.get("/", ArticlesController.index);

module.exports = router;
