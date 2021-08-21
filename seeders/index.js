const { Rating, Playlist } = require("../models");
const { fetchArtists } = require("./artists");
const { fetchAlbums } = require("./albums");
const { fetchSongs } = require("./songs");
const { populate } = require("./populate");
const { createPlaylist } = require("./playlist");
const mongoose = require("mongoose");

const add = async function () {
  try {
    await Rating.deleteMany();
    const playlists = await Playlist.find();
    for (const playlist of playlists) {
      playlist.songs = [];
      playlist.save();
    }

    await fetchArtists();
    await fetchAlbums();
    await fetchSongs();
    await populate();
    await createPlaylist();

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

add();
