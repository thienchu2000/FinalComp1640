const Articles = require("../models/Articles");
const coverData = require("../utils/coverData");
const fs = require("fs");
const archiver = require("archiver");
const path = require("path");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { myOAuth2Client } = require("../config/email");
const nodemailer = require("nodemailer");
const { env } = require("../config/environment");
const CloseDates = require("../models/CloseDates");
const AcademicYears = require("../models/AcademicYears");
const Facultis = require("../models/Facultis");
const Role = require("../models/Role");

class ManagerController {
  index(req, res, next) {
    var users = res.user;
    Articles.find({}).then((results) => {
      res.render("manager", {
        user: true,
        img: users.img,
        name: users.name,
        manager: true,
        dataAr: coverData(results),
        back: "https://t4.ftcdn.net/jpg/02/67/47/05/360_F_267470534_75jH8bHYJ59Zn4ikrdKDlzSqsjYumTqk.jpg",
      });
    });
  }
  async downloaded(req, res, next) {
    const idAr = req.params.idAr;
    var query = await Articles.findOne({ _id: idAr });
    var fileImg = query.img;
    var fileDoc = query.doc;
    var coverImg = Array.isArray(fileImg) ? fileImg[0] : fileImg;
    var coverDoc = Array.isArray(fileDoc) ? fileDoc[0] : fileDoc;
    const createZipFromFile = (file) => {
      const filePath = path.join(__dirname, "../public", file);
      const output = fs.createWriteStream(filePath + ".zip");
      const archive = archiver("zip", {
        zlib: { level: 9 },
      });
      archive.pipe(output);
      archive.file(filePath, { name: path.basename(filePath) });

      output.on("close", function () {
        res.download(filePath + ".zip");
      });
      output.on("end", function () {
        console.log("Data has been drained");
      });
      archive.on("warning", function (err) {
        if (err.code === "ENOENT") {
          console.warn(err);
        } else {
          throw err;
        }
      });
      archive.on("error", function (err) {
        throw err;
      });
      archive.finalize();
    };
    createZipFromFile(coverImg, res);
    createZipFromFile(coverDoc, res);
  }

  gusetCrA(req, res, next) {
    var users = res.user;
    Articles.find({}).then((results) => {
      res.render("managerCr", {
        user: true,
        img: users.img,
        name: users.name,
        manager: true,
        back: "https://t4.ftcdn.net/jpg/02/67/47/05/360_F_267470534_75jH8bHYJ59Zn4ikrdKDlzSqsjYumTqk.jpg",
      });
    });
  }

  async gusetCr(req, res, next) {
    const { name, email, roleTreatment, facultyWant } = req.body;
    var password = "GreenWich" + Math.floor(Math.random() * 100000);
    console.log(password);
    try {
      if (!name || !email || !roleTreatment || !facultyWant) {
        return res.send("Please enter correct information");
      }
      const checkEmail = await Users.findOne({ email });
      if (checkEmail) {
        return res.status(400).send("Email already exists");
      }
      if (password.length < 6) {
        return res.status(400).send("Password must be more than 6 characters");
      }
      const hashPassword = await bcrypt.hashSync(password, 10);
      const user = new Users({
        name,
        email,
        password: hashPassword,
        roleTreatment,
        facultis: facultyWant,
      });
      user.save();

      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      const myAccessToken = myAccessTokenObject.token;
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: env.ADMIN_EMAIL_ADDRESS,
          clientId: env.GOOGLE_MAILER_CLIENT_ID,
          clientSecret: env.GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: env.GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: myAccessToken,
        },
      });
      const mailOptions = {
        to: email,
        subject: `Student submission`,
        html: `<h3>  We give student ${name} an account to log in : 
        Account:${email}
        Password:${password}
        </h3>`,
      };
      await transport.sendMail(mailOptions);

      res.status(200).redirect("/manager");
    } catch (Err) {
      console.log(Err);
      return res.send("Err");
    }
  }
  async getS(req, res, next) {
    try {
      const ad = res.user;
      const dataClose = await CloseDates.find({})
        .populate("academic")
        .populate("faculty");
      const dataAcademicyears = await AcademicYears.find({});
      const dataFacultis = await Facultis.find({});
      const data = await Users.find({})
        .populate("role")
        .populate("facultis")
        .populate("closedate");
      const role = await Role.find({});
      const sumAr = await Articles.find({})
        .populate("faculty")
        .populate("users");

      var tong = data.length;

      var pusharr = [];
      var facultyCount = {};
      for (var i = 0; i < sumAr.length; i++) {
        var nameFaculty = sumAr[i].faculty.nameFaculty;

        if (nameFaculty) {
          if (!facultyCount[nameFaculty]) {
            facultyCount[nameFaculty] = 1;
          } else {
            facultyCount[nameFaculty]++;
          }
        }
      }
      for (var faculty in facultyCount) {
        pusharr.push({ name: faculty, count: facultyCount[faculty] });
      }

      var checkfa = await Articles.aggregate([
        {
          $group: { _id: "$users", count: { $sum: 1 } },
        },
        {
          $sortByCount: "$_id",
        },
      ]);
      const contributions = await Articles.aggregate([
        {
          $lookup: {
            from: "Facultis", // Tên của collection trong cơ sở dữ liệu
            localField: "faculty",
            foreignField: "_id",
            as: "faculty_doc",
          },
        },
        {
          $unwind: "$faculty_doc",
        },
        {
          $lookup: {
            from: "AcademicYears", // Tên của collection trong cơ sở dữ liệu
            localField: "academicYears",
            foreignField: "_id",
            as: "academic_year_doc",
          },
        },
        {
          $unwind: "$academic_year_doc",
        },
        {
          $group: {
            _id: {
              faculty: "$faculty_doc.nameFaculty",
              academicYear: "$academic_year_doc.academicYears",
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.faculty": 1, "_id.academicYear": 1 }, // Sắp xếp theo khoa và năm học
        },
      ]);

      console.log(contributions);

      var sumUser = tong - checkfa.length;

      var checkCmt = (await Articles.find({}))
        .filter((item) => {
          return (
            item.comment && item.comment !== undefined && item.comment !== null
          );
        })
        .map((item) => item.comment);

      var noCmt = sumAr.length - checkCmt.length;

      var checkAca = dataClose
        .filter((item) => {
          return item.academic !== undefined && item.academic !== null;
        })
        .map((item) => {
          return item._id;
        });
      return res.status(200).render("statistics", {
        user: true,
        admin: true,
        name: ad.name,
        data: coverData(data),
        nameRole: coverData(role),
        img: ad.img,
        dataClose: coverData(dataClose),
        sumAr: pusharr,
        tong: tong,
        Ar: sumUser,
        sumCmt: checkCmt.length,
        noCmt: noCmt,
        dataAcademicyears: coverData(dataAcademicyears),
        dataFacultis: coverData(dataFacultis),
        dataAr: coverData(sumAr),
        back: "https://png.pngtree.com/background/20210715/original/pngtree-simple-white-textured-crepe-paper-texture-background-picture-image_1296663.jpg",
      });
    } catch (err) {
      console.log(err);
      return res.send("404 Not Found");
    }
  }
}

module.exports = new ManagerController();
