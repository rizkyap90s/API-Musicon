// Rezki's Code
const express = require("express");
const { getToken } = require("../controllers/auth");
const { register, login, isLoggedIn } = require("../middlewares/auth");
const { signInValidator, signUpValidator } = require("../middlewares/validators/auth");
const { sendEmail } = require("../middlewares/mailer");

const router = express.Router();

router.post("/signup", signUpValidator, register, sendEmail, getToken);
router.post("/login", signInValidator, login, getToken);

module.exports = router;
