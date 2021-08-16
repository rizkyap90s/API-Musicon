// Rezki's Code
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const uploadImage = multer({ storage });

const { getUserById, updateDataUserById, updatePasswordUserById } = require("../controllers/users");
const {
  getUserByIdValidator,
  updateDataValidator,
  updatePasswordValidator,
} = require("../middlewares/validators/users");
const { isLoggedIn } = require("../middlewares/auth");

const router = express.Router();

router.get("/getuser/:id", getUserByIdValidator, getUserById);
router.put("/updatedata/:id", updateDataValidator, uploadImage.single("photo"), updateDataUserById);
router.put("/updatepassword/:id", isLoggedIn, updatePasswordValidator, updatePasswordUserById);

module.exports = router;
