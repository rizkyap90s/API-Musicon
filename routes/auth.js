// Rezki's Code
const express = require("express");
const { getToken } = require("../controllers/auth");
const { register, login } = require("../middlewares/auth");
const {
  signUpAndUpdateValidator,
  signInValidator,
} = require("../middlewares/validators/auth");
const { sendEmail } = require("../middlewares/mailer");

const router = express.Router();

router.post("/signup", signUpAndUpdateValidator, register, sendEmail, getToken);
router.post("/login", signInValidator, login, getToken);

module.exports = router;
