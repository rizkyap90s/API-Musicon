const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/playlists");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const uploadImage = multer({ storage });

const { isLoggedIn } = require("../middlewares/auth");
const { addNewPlaylist } = require("../controllers/playlists");
const router = express.Router();

router.post("/", isLoggedIn, uploadImage.single("playlistImage"), addNewPlaylist);

module.exports = router;
