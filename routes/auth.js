// Rezki's Code
const express = require("express");
const { getToken } = require("../controllers/auth");
const { register, login } = require("../middlewares/auth");
const { signInValidator, signUpValidator } = require("../middlewares/validators/auth");

const router = express.Router();

router.post("/signup", signUpValidator, register, getToken);
router.post("/login", signInValidator, login, getToken);

module.exports = router;
