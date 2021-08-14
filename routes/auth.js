// Rezki's Code
const express = require("express");
const { getToken } = require("../controllers/auth");
const { signUpAndUpdateValidator, signInValidator } = require("../middlewares/validators/auth");

const router = express.Router();

router.post("/signup", signUpAndUpdateValidator, getToken);
router.post("/login", signInValidator, getToken);

module.exports = router;
