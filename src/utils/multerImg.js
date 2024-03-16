const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    var fi = path.join(__dirname, "../public");
    if (!fs.existsSync(fi)) {
      fs.mkdirSync(fi);
    }
    cb(null, fi);
  },
  filename: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedMimes.includes(file.mimetype)) {
      const uniqueSuffix = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload images (jpeg,png,jpg).`;
      return cb(uniqueSuffix, null);
    }

    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const imageUpload = multer({ storage: imageStorage }).single("file");

const upload = (req, res, next) => {
  imageUpload(req, res, (error) => {
    if (error) {
      return res.send(`Error when trying to upload image: ${error}`);
    }
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const done = path.join(__dirname, "../public", req.file.filename);

    next();
  });
};

module.exports = upload;
