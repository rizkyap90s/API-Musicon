// Rezki's Code
const { User, Artist, Song, Playlist } = require("../models");
const mongoose = require("mongoose");

class Users {
  async getUserById(req, res, next) {
    try {
      const data = await User.findOne({ _id: req.params.id })
        .populate({ path: "playlists", model: Playlist })
        .select("-password -__v");
      data.playlists = data.playlists.map((playlist) => playlist._id);
      data._doc.playlistCreated = data.playlists.length;
      res.status(200).json({ data });
    } catch (error) {
      /* istanbul ignore next */
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
      /* istanbul ignore next */
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
      /* istanbul ignore next */
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
        .populate({ path: "artistId", model: Artist, select: { name: 1, photo: 1 } })
        .select("songTitle songImage artistId songDuration")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);

      res.status(200).json({ songs });
    } catch (error) {
      /* istanbul ignore next */
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
      /* istanbul ignore next */
      next(error);
    }
  }
}

module.exports = new Users();
