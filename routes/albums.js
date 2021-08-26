// Adib's Code
const express = require("express");

// Import auth
const { isLoggedIn } = require("../middlewares/auth/local");

// Import validator
const {
  getDetailValidator,
  queryValidator,
} = require("../middlewares/validators/albums");

// Import controller
const {
  getNewAlbums,
  getAlbumByTitle,
  getDetailAlbum,
} = require("../controllers/albums");

// Router
const router = express.Router();

// Make some routes
router.get("/new", isLoggedIn, getNewAlbums);
router.get("/search", isLoggedIn, queryValidator, getAlbumByTitle);
router.get("/:id", isLoggedIn, getDetailValidator, getDetailAlbum);

// Exports
module.exports = router;
