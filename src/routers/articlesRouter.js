const express = require("express");
const router = express.Router();
const ArticlesController = require("../controllers/ArticlesController");
const document_img = require("../utils/multerDoc_img");
const checkLogin = require("../utils/checkLogin");
const { isStudent } = require("../utils/authorize");

router.post(
  "/articlesC/:FacultyId/:AcademicYearsId",
  isStudent,
  checkLogin,
  document_img,
  ArticlesController.articlesC
);
router.get("/", checkLogin, isStudent, ArticlesController.index);

module.exports = router;
