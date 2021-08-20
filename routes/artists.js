const express = require("express");
const { isLoggedIn } = require("../middlewares/auth/local");
const { getArtistById, getArtistByTitle } = require("../controllers/artists");
const router = express.Router();

router.get("/search", isLoggedIn, getArtistByTitle);
router.get("/:id", isLoggedIn, getArtistById);

module.exports = router;
