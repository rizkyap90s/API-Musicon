const axios = require("axios");
let dumps = require("./utils/dumps.json");
const { token } = require("./utils/token"); // token expires in ~1 hour
const { Artist } = require("../models");

const API_PARTIAL = "https://api.spotify.com/v1";

exports.fetchArtists = async function () {
  try {
    await Artist.deleteMany(); // delete all previous entries
    for (artist in dumps.artists) {
      const response = await axios.get(
        `${API_PARTIAL}/artists/${dumps.artists[artist]}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await Artist.create({
        name: response.data.name,
        photo: response.data.images[0].url,
      });
    }
    // mongoose.disconnect();
    return console.log("Artists seeded.");
  } catch (error) {
    return console.error(error);
  }
};
