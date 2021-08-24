const { Playlist, User, Song, Artist } = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class Playlists {
  async addNewPlaylist(req, res, next) {
    try {
      if (req.file) {
        req.body.playlistImage = "/" + req.file.path.split("/").slice(1).join("/");
      }
      req.body.author = ObjectId(req.user.user);
      // req.body.songs = req.body.songs.split(", ").map((song) => ObjectId(song));
      await Playlist.create(req.body);
      res.status(201).json({ message: "Playlist created." });
    } catch (error) {
      next(error);
    }
  }

  async addSong(req, res, next) {
    try {
      const findPlaylist = await Playlist.findById(req.params.playlistid);
      findPlaylist.songs.push(req.params.songid);
      findPlaylist.save();

      res.status(201).json({ data: findPlaylist });
    } catch (error) {
      next(error);
    }
  }

  async removeSong(req, res, next) {
    try {
      const findPlaylist = await Playlist.findById(req.params.playlistid);
      const getIndexSong = findPlaylist.songs.indexOf(req.params.songid);
      findPlaylist.songs.splice(getIndexSong, 1);

      const data = await Playlist.findOneAndUpdate(
        { _id: req.params.playlistid },
        { songs: findPlaylist.songs },
        { new: true }
      );

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getAllPlaylists(req, res, next) {
    try {
      const data = await Playlist.find().populate("author");
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getUserPlaylists(req, res, next) {
    try {
      const getAllPlaylist = await Playlist.find({ author: req.params.id });
      // for (const playlist of getAllPlaylist) {
      //   console.log(playlist);
      //   for (const songs of playlist.songs) {
      //   }
      // }
      res.status(200).json({ data: getAllPlaylist });
    } catch (error) {
      next(error);
    }
  }

  async getPlaylistById(req, res, next) {
    try {
      const data = await Playlist.findOne({ _id: req.params.id })
        .populate({
          path: "songs",
          model: Song,
          select: { _id: 1, songTitle: 1, songDuration: 1, songImage: 1 },
          populate: {
            path: "artistId",
            model: Artist,
            select: { _id: 1, name: 1 },
          },
        })
        .populate({
          path: "author",
          model: User,
          select: { _id: 1, username: 1, fullname: 1 },
        });
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
  async getPlaylistByTitle(req, res, next) {
    try {
      const getTitle = req.query.title;
      const pageSize = parseInt(req.query.limit) || 15;
      const currentPage = req.query.page;
      const regex = new RegExp(getTitle, "i");

      const playlist = await Playlist.find({ playlistTitle: { $regex: regex } })
        // .populate({ path: "author", model: User })
        .select("playlistTitle playlistImage author")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort("-releaseDate");

      if (playlist.length === 0) {
        return next({ message: "Playlist not found", statusCode: 404 });
      }

      res.status(200).json({ playlist });
    } catch (error) {
      next(error);
    }
  }

  async updatePlaylistById(req, res, next) {
    try {
      if (req.file) {
        req.body.playlistImage = "/" + req.file.path.split("/").slice(1).join("/");
      }
      req.body.author = ObjectId(req.user.user);
      await Playlist.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      });
      res.status(200).json({ message: "Playlist updated." });
    } catch (error) {
      next(error);
    }
  }

  async deletePlaylistById(req, res, next) {
    try {
      const getPlaylist = await Playlist.findOne({ _id: req.params.id });
      if (!getPlaylist) return next({ statusCode: 404, message: "Playlist not found." });
      if (getPlaylist.author != req.user.user) {
        return next({ statusCode: 403, message: "Access denied." });
      }
      await Playlist.deleteOne({ _id: req.params.id });
      res.status(201).json({ message: "Playlist deleted." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Playlists();
