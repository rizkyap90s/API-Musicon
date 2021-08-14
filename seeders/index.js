const { fetchArtists } = require("./artists");
const { fetchAlbums } = require("./albums");
const { fetchSongs } = require("./songs");

const add = async function () {
  try {
    await fetchArtists();
    await fetchAlbums();
    await fetchSongs();
  } catch (error) {
    console.error(error);
  }
};

add();
