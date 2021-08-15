const { Artist, Album, Song } = require("../models");

exports.populate = async function () {
  try {
    const albums = await Album.find().select("_id songs");
    const albumIds = albums.map((el) => el._id);

    for (album in albumIds) {
      const songs = await Song.find({ albumId: albumIds[album] }).select("_id");
      const songIds = songs.map((el) => el._id);
      albums[album].songs = songIds;
      await albums[album].save();
    }

    const artists = await Artist.find().select("_id albums");
    const artistIds = artists.map((el) => el._id);

    for (artist in artistIds) {
      const albums = await Album.find({ artistId: artistIds[artist] }).select(
        "_id"
      );
      const albumIds = albums.map((el) => el._id);
      artists[artist].albums = albumIds;
      await artists[artist].save();
    }

    return console.log("Populate successful.");
  } catch (error) {
    return console.error(error);
  }
};
