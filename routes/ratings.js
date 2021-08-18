// Adib's Code
const express = require("express");

const { isLoggedIn } = require("../middlewares/auth");

const { ratingValidator } = require("../middlewares/validators/ratings");

const { sendAuthorEmail } = require("../middlewares/mailers/rateNotification");

const { addRating, updateRating } = require("../controllers/ratings");

const router = express.Router({ mergeParams: true });

router.route("/").post(isLoggedIn, ratingValidator, sendAuthorEmail, addRating);
router.route("/:id").put(isLoggedIn, ratingValidator, updateRating);

module.exports = router;
