const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const { isAdmin } = require("../utils/authorize");

router.put("/update/:id", isAdmin, AdminController.update);
router.get("/", isAdmin, AdminController.index);

module.exports = router;
