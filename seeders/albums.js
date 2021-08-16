const axios = require("axios");
let dumps = require("./utils/dumps.json");
const { token } = require("./utils/token"); // token expires in ~1 hour
const { Artist, Album } = require("../models");

const API_PARTIAL = "https://api.spotify.com/v1";

exports.fetchAlbums = async function () {
  try {
    await Album.deleteMany(); // delete all previous entries
    for (artist in dumps.artists) {
      const response = await axios.get(`${API_PARTIAL}/artists/${dumps.artists[artist]}/albums`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      for (let i = 1; i < 4; i++) {
        /* Only create 3 albums per artist. 
        Starting index from 1 because one of the aritsts' most recent album doesn't follow the format,
        so it is omitted.
        */
        const sanitizedResponse = {
          albumTitle: response.data.items[i].name,
          releaseDate: response.data.items[i].release_date,
          albumImage: response.data.items[i].images[0].url,
          albumDuration: response.data.items[i].total_tracks * 147,
          spotifyId: response.data.items[i].id,
        };

        const artistId = await Artist.find({
          name: response.data.items[i].artists[0].name,
        }).select("_id");

        sanitizedResponse.artistId = artistId[0]._id;

        await Album.create(sanitizedResponse);
      }
    }

    return console.log("Albums seeded.");
  } catch (error) {
    return console.error(error);
  }
};
// dhiaid
