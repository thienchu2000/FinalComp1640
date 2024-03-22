const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const { isAdmin } = require("../utils/authorize");

router.delete("/deleteAr/:id", AdminController.deleteAr);
router.delete("/deleteFa/:id", AdminController.deleteFa);
router.put("/updateFa/:id", AdminController.updateFa);
router.post("/facultyC", AdminController.facultyC);
router.put("/closedateUp/:id", AdminController.closedateUp);
router.delete("/deleteCloseDates/:id", AdminController.deleteCloseDates);
router.post("/closeDate", AdminController.closeDate);
router.delete("/deleteAcademic/:academicId", AdminController.deleteAcademic);
router.put("/updateA/:id", AdminController.updateA);
router.post("/academic", AdminController.academic);
router.delete("/deleteUser/:id", AdminController.deleteUser);
router.put("/update/:id", isAdmin, AdminController.update);
router.get("/", isAdmin, AdminController.index);

module.exports = router;
