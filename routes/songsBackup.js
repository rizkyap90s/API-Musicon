// Adib's Code
const express = require("express");

// Import auth
// const { isLoggedIn } = require("../middlewares/auth");

// Import validator
const {
  getDetailValidator,
  queryValidator,
} = require("../middlewares/validators/songsBackup");

// Import controller
const { getDetailSong, getSongByTitle } = require("../controllers/songsBackup");

// Router
const router = express.Router();

// Make some routes
router.route("/:id").get(/* isLoggedIn, */ getDetailValidator, getDetailSong);
router.route("/search").get(/* isLoggedIn, */ queryValidator, getSongByTitle);

// Exports
module.exports = router;
