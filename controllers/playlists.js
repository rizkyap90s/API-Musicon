const { Playlist } = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class Playlists {
  async addNewPlaylist(req, res, next) {
    try {
      if (req.file) {
        req.body.playlistImage = `./${req.file.path}`;
      }
      req.body.author = ObjectId(req.user.user);
      req.body.songs = req.body.songs.split(", ").map((song) => ObjectId(song));
      const data = await Playlist.create(req.body);
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Playlists();
