const { env } = require("../config/environment");
const covertData = require("../utils/coverData");
const nodemailer = require("nodemailer");
const Users = require("../models/Users");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { myOAuth2Client } = require("../config/email");
const Articles = require("../models/Articles");
const Facultis = require("../models/Facultis");

class ArticlesController {
  index(req, res, next) {
    res.send("hello world");
  }

  // CRUD---ASSIGNMENT.

  // send --- ASS database send email teacher.
  async createAss(req, res, next) {
    const { submitsions, teacherId, studentId } = req.body;
    console.log(req.body);

    try {
      if (!submitsions) {
        return res.status(400).send("Please send a submission");
      }
      // const assignments = new Assignments({
      //   submitsions,
      // });
      // assignments.save();
      // res.status(200).send("Done");
      const checkdb = await Users.findById({ _id: teacherId, _id: studentId })
        .populate("subject")
        .populate("role");
      console.log(checkdb);
      // const check = checkdb
      //   .filter((item) => item.role.name === "Teacher")
      //   .map((item) => item.email);
      // console.log(check);
    } catch (err) {
      return res.status(500).send("err db");
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

module.exports = new ArticlesController();
