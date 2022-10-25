const multer = require("multer");

// set custom file destination and filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../../data/uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = file.filename;
    const fileExt = fileName.split(".")[1];
    cb(null, file.fieldname + "-" + req.user.id + fileExt);
  },
});

module.exports = storage;
