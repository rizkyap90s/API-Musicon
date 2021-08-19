// Adib's Code
const express = require("express");

const { isLoggedIn } = require("../middlewares/auth/local");

const {
  getDetailValidator,
  queryValidator,
} = require("../middlewares/validators/songsBackup");

const {
  getDetailSong,
  getSongByTitle,
  getNewReleases,
  getRecommended,
} = require("../controllers/songsBackup");

const router = express.Router();

router.route("/search").get(isLoggedIn, queryValidator, getSongByTitle);
router.route("/new").get(isLoggedIn, queryValidator, getNewReleases);
router.route("/recommended").get(isLoggedIn, queryValidator, getRecommended);
router.route("/:id").get(isLoggedIn, getDetailValidator, getDetailSong);

module.exports = router;
