const express = require("express");
const router = express.Router();
const FeedbackController = require("../contronllers/FeedbackContronller");

router.get("/", FeedbackController.index);

module.exports = router;
