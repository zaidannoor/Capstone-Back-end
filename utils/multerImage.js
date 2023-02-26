const multer = require("multer");
// const handler = require("./handler");

const supportType = ["image/jpeg", "image/png","image/jpg"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    if (!supportType.includes(file.mimetype)) {
      cb(new Error("File type not supported"), null);
      return;
    }
    cb(
      null,
       "image-"+  Date.now() + "-" + file.originalname
    );
  },
});
const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024,
  },
});

module.exports = uploadImage;