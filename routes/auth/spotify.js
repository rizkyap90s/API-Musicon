// Adib's Code
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const SpotifyWebApi = require("spotify-web-api-node");
const querystring = require("querystring");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
      res.status(200).json(data.body);
    },
    function (err) {
      res.sendStatus(400);
    }
  );
});

module.exports = router;
