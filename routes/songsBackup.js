// Adib's Code
const express = require("express");

// Import auth
const { user } = require("../middlewares/auth");

// Import validator
const { queryValidator } = require("../middlewares/validators/songsBackup");

// Import controller
const { getSongByTitle } = require("../controllers/songsBackup");

// Router
const router = express.Router();

// Make some routes
router.route("/search").get(queryValidator, getSongByTitle);

// Exports
module.exports = router;
