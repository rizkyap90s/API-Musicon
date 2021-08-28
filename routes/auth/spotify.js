// Adib's Code
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const SpotifyWebApi = require("spotify-web-api-node");

const express = require("express");
const router = express.Router();

router.post("/get_token", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    // redirectUri: process.env.REDIRECT_URI,
    redirectUri: "http://localhost:3000/user",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log(data);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = router;
