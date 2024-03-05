const News = require("../models/News");
const { env } = require("../config/environment");
const covertData = require("../utils/coverData");
const nodemailer = require("nodemailer");
const Users = require("../models/Users");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { myOAuth2Client } = require("../config/email");
const Assignments = require("../models/Assignments");

class AssignmentsController {
  index(res, req, next) {
    res.send("hello world");
  }
}

module.exports = new AssignmentsController();
