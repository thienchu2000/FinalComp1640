const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const { isAdmin } = require("../utils/authorize");

router.delete("/deleteAr/:id", isAdmin, AdminController.deleteAr);
router.delete("/deleteFa/:id", isAdmin, AdminController.deleteFa);
router.put("/updateFa/:id", isAdmin, AdminController.updateFa);
router.post("/facultyC", isAdmin, AdminController.facultyC);
router.put("/closedateUp/:id", isAdmin, AdminController.closedateUp);
router.delete(
  "/deleteCloseDates/:id",
  isAdmin,
  AdminController.deleteCloseDates
);
router.post("/closeDate", isAdmin, AdminController.closeDate);
router.delete(
  "/deleteAcademic/:academicId",
  isAdmin,
  AdminController.deleteAcademic
);
router.put("/updateA/:id", isAdmin, AdminController.updateA);
router.post("/academic", isAdmin, AdminController.academic);
router.delete("/deleteUser/:id", isAdmin, AdminController.deleteUser);
router.put("/update/:id", isAdmin, AdminController.update);
router.get("/", isAdmin, AdminController.index);

module.exports = router;
