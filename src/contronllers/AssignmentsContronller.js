const { env } = require("../config/environment");
const covertData = require("../utils/coverData");
const nodemailer = require("nodemailer");
const Users = require("../models/Users");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { myOAuth2Client } = require("../config/email");
const Assignments = require("../models/Assignments");

class AssignmentsController {
  index(req, res, next) {
    res.send("hello world");
  }

  // CRUD---ASSIGNMENT.

  // send --- ASS database send email teacher.
  async createAss(req, res, next) {
    const { submitsions } = req.body;
    try {
      if (!submitsions) {
        return res.status(400).send("Please send a submission");
      }
      const assignments = new Assignments({
        submitsions,
      });
      assignments.save();
      res.status(200).send("Done");
      // const checkdb = await Users.find({})
      // if (checkdb.role ==="teacher" && checkdb.sujects ===  ) {
    } catch (err) {
      return res.send.status(500).send("err db");
    }
  }

  async readAss(req, res, next) {
    const data = await Assignments.find({})
      .then((data) => {
        res.status(200).send(covertData(data));
      })
      .catch((err) => {
        return res.send(err);
      });
  }
}

module.exports = new AssignmentsController();
