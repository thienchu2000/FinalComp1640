const { env } = require("../config/environment");
const covertData = require("../utils/coverData");
const nodemailer = require("nodemailer");
const Users = require("../models/Users");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { myOAuth2Client } = require("../config/email");
const Articles = require("../models/Articles");
const Facultis = require("../models/Facultis");
const multer = require("multer");

class ArticlesController {
  index(req, res, next) {
    res.send("hello world");
  }

  // CRUD---articles

  // send --- ASS database send email teacher.
  async createAss(req, res, next) {
    const { articlesName, studentId } = req.body;
    console.log(req.body);

    try {
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
