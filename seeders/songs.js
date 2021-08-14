const axios = require("axios");
const { token } = require("./utils/token"); // token expires in ~1 hour
const { Album, Song } = require("../models");
const mongoose = require("mongoose");

const API_PARTIAL = "https://api.spotify.com/v1";

exports.fetchSongs = async function () {
  try {
    await Song.deleteMany(); // delete all previous entries
    let albums = await Album.find();
    const albumIds = albums.map((el) => el.spotifyId);
    const releaseDates = albums.map((el) => el.releaseDate);
    const albumImages = albums.map((el) => el.albumImage);

    for (album in albumIds) {
      const response = await axios.get(
        `${API_PARTIAL}/albums/${albumIds[album]}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const albumMongo = await Album.find({ spotifyId: albumIds[album] });

      for (let i = 0; i < response.data.items.length; i++) {
        const sanitizedResponse = {
          songTitle: response.data.items[i].name,
          releaseDate: releaseDates[album],
          songImage: albumImages[album],
          songDuration: Math.floor(response.data.items[i].duration_ms / 1000),
          albumId: albumMongo[0]._id,
          artistId: albumMongo[0].artistId,
          audio: response.data.items[i].uri,
        };

        await Song.create(sanitizedResponse);
      }
    }

    mongoose.disconnect();
    return console.log("Songs seeded.");
  } catch (error) {
    return console.error(error);
  }
};
