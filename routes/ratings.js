// Adib's Code
const express = require("express");

const { isLoggedIn } = require("../middlewares/auth/local");

const {
  getRatingValidator,
  ratingValidator,
} = require("../middlewares/validators/ratings");

const { sendAuthorEmail } = require("../middlewares/mailers/rateNotification");

const { getRating, createOrUpdateRating } = require("../controllers/ratings");

const router = express.Router({ mergeParams: true });

router.get("/", isLoggedIn, getRatingValidator, getRating);
router.post(
  "/",
  isLoggedIn,
  ratingValidator,
  sendAuthorEmail,
  createOrUpdateRating
);

module.exports = router;
