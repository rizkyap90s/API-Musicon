const express = require("express");
const { getToken } = require("../../controllers/auth");

const passport = require("passport");
require("../../middlewares/auth/facebook");

const router = express.Router();

const success = (req, res) => {
  res.status(200).json({ message: req.user });
};

const callbackFacebook = passport.authenticate("facebook", {
  failureRedirect: "auth/facebook/failed", // absolute path, not relative router path
});

router.get("/", passport.authenticate("facebook", { scope: "email" }));

router.get("/callback", callbackFacebook, /* success */ getToken);

router.get("/failed", (req, res) => res.status(401).json({ message: "Login failed" }));

module.exports = router;
