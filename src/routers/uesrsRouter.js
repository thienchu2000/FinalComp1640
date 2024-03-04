const express = require("express");
const router = express.Router();
const UsersContronller = require("../contronllers/UsersContronller");

router.get("/", UsersContronller.index);

module.exports = router;
