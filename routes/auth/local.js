// Rezki's Code
const express = require("express");
const { getToken } = require("../../controllers/auth");
const { register, login } = require("../../middlewares/auth/local");
const {
  signInValidator,
  signUpValidator,
} = require("../../middlewares/validators/auth");
const { sendWelcomeEmail } = require("../../middlewares/mailers/welcome");

const router = express.Router();

router.post("/signup", signUpValidator, register, sendWelcomeEmail, getToken);
router.post("/login", signInValidator, login, getToken);

module.exports = router;
