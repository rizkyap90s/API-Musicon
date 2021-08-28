// Adib's Code
const express = require("express");

const { isLoggedIn } = require("../middlewares/auth/local");

const {
  getDetailValidator,
  queryValidator,
} = require("../middlewares/validators/songs");

const {
  getDetailSong,
  getSongByTitle,
  getSongByTag,
  getNewReleases,
  getRecommended,
  getLyrics,
} = require("../controllers/songs");

const { getLike, createOrUpdateLike } = require("../controllers/likes");

const router = express.Router();

router.get("/search_tags", isLoggedIn, queryValidator, getSongByTag);
router.get("/search", isLoggedIn, queryValidator, getSongByTitle);
router.get("/new", isLoggedIn, queryValidator, getNewReleases);
router.get("/recommended", isLoggedIn, queryValidator, getRecommended);
router.get("/:id/lyrics", isLoggedIn, getLyrics);
router.get("/:id/like", isLoggedIn, getLike);
router.post("/:id/like", isLoggedIn, createOrUpdateLike);
router.get("/:id", isLoggedIn, getDetailValidator, getDetailSong);

module.exports = router;
