const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/playlists");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadImage = multer({ storage });

const { isLoggedIn } = require("../middlewares/auth");
const {
  addNewPlaylist,
  getAllPlaylists,
  getUserPlaylists,
  updatePlaylistById,
  deletePlaylistById,
  getPlaylistById,
  getPlaylistByTitle,
  addSong,
  // removeSong,
} = require("../controllers/playlists");
const router = express.Router();

router.post("/", isLoggedIn, uploadImage.single("playlistImage"), addNewPlaylist);

router.get("/", isLoggedIn, getAllPlaylists);
router.get("/search", isLoggedIn, getPlaylistByTitle);
router.get("/:id", isLoggedIn, getPlaylistById);
router.get("/users/:id", isLoggedIn, getUserPlaylists);

router.post("/:id", isLoggedIn, addSong);
// router.delete("/:playlistid/:songid", isLoggedIn, removeSong);

router.put("/update/:id", isLoggedIn, uploadImage.single("playlistImage"), updatePlaylistById);

router.delete("/:id", isLoggedIn, deletePlaylistById);

module.exports = router;
