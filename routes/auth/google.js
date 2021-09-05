const express = require("express");
const {
  googleLoginSanitizerValidator,
} = require("../../middlewares/auth/googleV2");
const { updateUserDatabase } = require("../../middlewares/auth/local");
const { getToken } = require("../../controllers/auth");

const passport = require("passport");
require("../../middlewares/auth/google");

const router = express.Router();

const callbackGoogle = passport.authenticate("google", {
  failureRedirect: "https://musicon.gabatch13.my.id/auth/google/failed",
});

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/callback", callbackGoogle, getToken);
router.get("/failed", (req, res) =>
  res.status(401).json({ message: "Login failed" })
);

// login v2 route
router.post("/v2", googleLoginSanitizerValidator, updateUserDatabase, getToken);

module.exports = router;
