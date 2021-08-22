// Rezki's Code
const { User, Artist, Song, Playlist } = require("../models");
const mongoose = require("mongoose");

class Users {
  async getUserById(req, res, next) {
    try {
      const data = await User.findOne({ _id: req.params.id })
        .populate("playlists")
        .select("-password -__v");

      data._doc.total = data.playlists.length;
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateDataUserById(req, res, next) {
    try {
      if (req.file) {
        req.body.photo = "/" + req.file.path.split("/").slice(1).join("/");
      }
      const data = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      }).select("-password -__v");
      if (!data) {
        return next({ message: "User not found.", statusCode: 404 });
      }
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }
  async updatePasswordUserById(req, res, next) {
    try {
      req.body.password = req.body.newPassword;
      await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      });
      res.status(201).json({ message: `Password has been changed.` });
    } catch (error) {
      next(error);
    }
  }

  async userTopSongs(req, res, next) {
    try {
      const pageSize = +req.query.limit || 15;
      const currentPage = req.query.page;

      const getUser = await User.findById(req.params.id).populate("playlists");
      const topSongs = new Set();
      for (const playlist of getUser.playlists) {
        for (const song of playlist.songs) {
          topSongs.add(mongoose.Types.ObjectId(song));
        }
      }
      const songs = await Song.find({ _id: { $in: [...topSongs] } })
        .select("songTitle songImage")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);

      res.status(200).json({ songs });
    } catch (error) {
      next(error);
    }
  }
  async userTopArtist(req, res, next) {
    try {
      const pageSize = +req.query.limit || 15;
      const currentPage = req.query.page;

      const getUser = await User.findById(req.params.id).populate({
        path: "playlists",
        model: Playlist,
        select: { songs: 1 },
        populate: {
          path: "songs",
          model: Song,
          select: { artistId: 1 },
        },
      });
      const topArtists = new Set();
      for (const playlist of getUser.playlists) {
        for (const song of playlist.songs) {
          topArtists.add(mongoose.Types.ObjectId(song.artistId));
        }
      }
      const artists = await Artist.find({ _id: { $in: [...topArtists] } })
        .select("name photo")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);

      res.status(200).json({ artists });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Users();
