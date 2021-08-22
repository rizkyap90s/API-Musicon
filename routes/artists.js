const express = require("express");
const { isLoggedIn } = require("../middlewares/auth/local");
const { getArtistById, getArtistByTitle, getNewReleaseArtist } = require("../controllers/artists");
const router = express.Router();

router.get("/new", isLoggedIn, getNewReleaseArtist);
router.get("/search", isLoggedIn, getArtistByTitle);
router.get("/:id", isLoggedIn, getArtistById);

module.exports = router;
