const express = require("express");
const router = express.Router();
const CommentsController = require("../contronllers/CommentsContronller");

router.get("/", CommentsController.index);

module.exports = router;
