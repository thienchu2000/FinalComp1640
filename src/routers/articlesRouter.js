const express = require("express");
const router = express.Router();
const ArticlesController = require("../controllers/ArticlesController");
const document_img = require("../utils/multerDoc_img");
const upload = require("../utils/multerImg");
const checkLogin = require("../utils/checkLogin");

router.post(
  "/articlesC/:FacultyId/:AcademicYearsId",
  checkLogin,
  document_img,
  ArticlesController.articlesC
);
router.get("/", checkLogin, ArticlesController.index);

module.exports = router;
