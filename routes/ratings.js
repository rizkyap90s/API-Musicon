// Adib's Code
const express = require("express");

// Import auth
const { isLoggedIn } = require("../middlewares/auth");

// Import validator
const { ratingValidator } = require("../middlewares/validators/ratings");

// Import controller
const { addRating, updateRating } = require("../controllers/ratings");

// Router
const router = express.Router({ mergeParams: true });

// Make some routes
router.route("/").post(isLoggedIn, ratingValidator, addRating);
router.route("/").put(isLoggedIn, ratingValidator, updateRating);

// Exports
module.exports = router;
