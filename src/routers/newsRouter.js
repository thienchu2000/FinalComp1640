const express = require("express");
const router = express.Router();
const NewsController = require("../controllers/NewsController");

router.post("/StaffsendEmail", NewsController.StaffsendEmail);
router.delete("/deleteNews/:deleteID", NewsController.deleteNews);
router.put("/upNews/:upDateID", NewsController.upDateNews);
router.get("/readNews", NewsController.readNews);
router.post("/createNews", NewsController.createNews);
router.get("/", NewsController.index);

module.exports = router;
