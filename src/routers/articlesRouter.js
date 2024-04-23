const express = require("express");
const router = express.Router();
const ArticlesController = require("../controllers/ArticlesController");
const document_img = require("../utils/multerDoc_img");
const checkLogin = require("../utils/checkLogin");
const { isStudent } = require("../utils/authorize");

router.post(
  "/uparticles/:_id",
  isStudent,
  document_img,
  ArticlesController.upArticle
);
router.post(
  "/articlesC/:FacultyId/:AcademicYearsId",
  isStudent,
  document_img,
  ArticlesController.articlesC
);
router.get("/", isStudent, ArticlesController.index);

module.exports = router;
