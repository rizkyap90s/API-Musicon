// Rezki's Code
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
  /* istanbul ignore next */
  destination: function (req, file, cb) {
    cb(null, "./public/images/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const uploadImage = multer({ storage });

const {
  getUserById,
  updateDataUserById,
  updatePasswordUserById,
  userTopSongs,
  userTopArtist,
  getLikedSongs,
} = require("../controllers/users");

const {
  getUserByIdValidator,
  updateDataValidator,
  updatePasswordValidator,
} = require("../middlewares/validators/users");

const { isLoggedIn } = require("../middlewares/auth/local");

const router = express.Router();

router.get("/:id/likedsongs", isLoggedIn, getLikedSongs);
router.get("/:id/topsongs", isLoggedIn, userTopSongs);
router.get("/:id/topartists", isLoggedIn, userTopArtist);
router.get("/:id", isLoggedIn, getUserByIdValidator, getUserById);
router.put(
  "/updatedata/:id",
  isLoggedIn,
  updateDataValidator,
  uploadImage.single("photo"),
  updateDataUserById
);
router.put(
  "/updatepassword/:id",
  isLoggedIn,
  updatePasswordValidator,
  updatePasswordUserById
);

module.exports = router;
