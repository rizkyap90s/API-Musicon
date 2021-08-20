const express = require("express");
const { getToken } = require("../../controllers/auth");

const passport = require("passport");
require("../../middlewares/auth/google");

const router = express.Router();

const callbackGoogle = passport.authenticate("google", {
  failureRedirect: "auth/google/failed", // absolute path, not relative router path
});

router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/callback", callbackGoogle, getToken);

router.get("/failed", (req, res) => res.status(401).json({ message: "Login failed" }));

module.exports = router;
