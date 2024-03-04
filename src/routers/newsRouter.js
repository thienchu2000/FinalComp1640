const express = require("express");
const router = express.Router();
const NewsController = require("../contronllers/NewsContronller");

router.post("/sendEmail", NewsController.sendEmail);
router.put("/upNews/:upDateID", NewsController.upDate);
router.delete("/deleteNews/:deleteID", NewsController.delete);
router.post("/createNews", NewsController.create);
router.get("/readNews", NewsController.read);
router.get("/", NewsController.index);

module.exports = router;
