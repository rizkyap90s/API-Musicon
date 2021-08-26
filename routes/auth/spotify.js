// Adib's Code
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const SpotifyWebApi = require("spotify-web-api-node");
const querystring = require("querystring");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const code = res.req.query.code;
  res.redirect("/auth/spotify/callback?code=" + code);
});

router.get("/login", (req, res) => {
  const scope =
    "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      })
  );
});

router.get("/callback", (req, res) => {
  const code = res.req.query.code;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
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
