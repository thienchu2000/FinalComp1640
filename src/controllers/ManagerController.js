const Articles = require("../models/Articles");
const coverData = require("../utils/coverData");
const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

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
}

module.exports = new ManagerController();
