const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");
const router = express.Router();
const authorization = require("../middleware/authorization");
// const multer = require("multer");
// const storage = require("../config/imageStorage/storageConfig");
// const upload = multer({ storage: storage });
// const avatarUpload = upload.fields([{ name: 'avatar', maxCount: 1 }])

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/updateuser", authorization, updateUser);

module.exports = router;
