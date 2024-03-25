const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");

router.get("/bestArticle", HomeController.bestArticle);
router.get("/", HomeController.index);

module.exports = router;
