// Adib's Code
const express = require("express");

// Import auth
const { isLoggedIn } = require("../middlewares/auth");

// Import validator
const {
  getDetailValidator,
  queryValidator,
} = require("../middlewares/validators/songsBackup");

// Import controller
const {
  getDetailSong,
  getSongByTitle,
  getNewReleases,
  getRecommended,
} = require("../controllers/songsBackup");

// Router
const router = express.Router();

// Make some routes
router.route("/search").get(isLoggedIn, queryValidator, getSongByTitle);
router.route("/new").get(isLoggedIn, queryValidator, getNewReleases);
router.route("/recommended").get(isLoggedIn, queryValidator, getRecommended);
router.route("/:id").get(isLoggedIn, getDetailValidator, getDetailSong);

// Exports
module.exports = router;
