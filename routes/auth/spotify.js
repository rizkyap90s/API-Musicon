// Adib's Code
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const SpotifyWebApi = require("spotify-web-api-node");

const express = require("express");
const router = express.Router();

router.get("/get_token", (req, res) => {
  // const code = req.query.code;
  const code =
    "AQCSHOqdupD1dquH1hz5CIAFQZEcYfsAtPP1ytVJC1bfjeWtF3THOwb473Y8mIYm01aHxfBhAN_a24S564EywDLao4pCu0R9tBS7xO-bK59aeUg5tvtQFpcCaBsTNLovvR_Mb-EvvlD7LmgcD89Fnt5vv1o8J8I3pJADOT3HeTOMUK-7W86620zBQyxwPMVh6OUli7RGKfcadTf0qM-ORfV5G9BR14MjQSl_LpyuZeYD3bQ8F-_m4mVRqlV4IPiE2TLam_mTE_zp84qKmv-GWgQ56P0U0JWsIGPUW-yg0Q2iugOGctrDhAyXBIpIHWmrn87p3YDHN6nL0TaIKA6XIYm4TkllulzX7Tmu";

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
