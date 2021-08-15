// Adib's Code
const express = require("express");

// Import auth
// const { isLoggedIn } = require("../middlewares/auth");

// Import validator
const { queryValidator } = require("../middlewares/validators/albums");

// Import controller
const { getNewAlbums, getAlbumByTitle } = require("../controllers/albums");

// Router
const router = express.Router();

// Make some routes
router.route("/new").get(/* isLoggedIn, */ getNewAlbums);
router.route("/search").get(/* isLoggedIn, */ queryValidator, getAlbumByTitle);

// Exports
module.exports = router;
