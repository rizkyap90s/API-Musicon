const { fetchArtists } = require("./artists");
const { fetchAlbums } = require("./albums");
const { fetchSongs } = require("./songs");
const { populate } = require("./populate");
const mongoose = require("mongoose");
const { Rating } = require("../models");

const add = async function () {
  try {
    await Rating.deleteMany();
    await fetchArtists();
    await fetchAlbums();
    await fetchSongs();
    await populate();

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

add();
