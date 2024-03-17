const multer = require("multer");
const path = require("path");
const fs = require("fs");

const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "../public");
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    var allowedMimes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedMimes.includes(file.mimetype)) {
      var uniqueSuffix = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload documents (doc or docx).`;
      return cb(uniqueSuffix, null);
    }
    var filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const uploadDoc = multer({ storage: docStorage }).any("files");

function document_img(req, res, next) {
  uploadDoc(req, res, (error) => {
    if (error) {
      return res
        .status(400)
        .send(`Error when trying to upload document: ${error}`);
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No file uploaded.");
    }

    var done = path.join(__dirname, "../public", req.files[0].filename);

    next();
  });
}

module.exports = document_img;
