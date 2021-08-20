// Adib's Code
const { Song, Artist } = require("../models");

class SongCtrl {
  async getDetailSong(req, res, next) {
    try {
      let data = await Song.findById(req.params.id).populate({
        path: "artistId",
        model: Artist,
      });

      if (!data) {
        return next({ message: "Song not found", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getSongByTitle(req, res, next) {
    try {
      const pageSize = parseInt(req.query.limit) || 15;
      const currentPage = req.query.page;
      const regex = new RegExp(req.query.title, "i");

      const song = await Song.find({ songTitle: { $regex: regex } })
        .populate({ path: "artistId", model: Artist })
        .select("songTitle songImage artistId tags")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort("-releaseDate");

      if (song.length === 0) {
        return next({ message: "Song not found", statusCode: 404 });
      }

      res.status(200).json({ song });
    } catch (error) {
      next(error);
    }
  }

  async getNewReleases(req, res, next) {
    try {
      const pageSize = parseInt(req.query.limit) || 15;
      const currentPage = req.query.page;
      const regex = new RegExp("^202[01].*");

      const songs = await Song.find({ releaseDate: { $regex: regex } })
        .populate({ path: "artistId", model: Artist })
        .select("songTitle songImage artistId")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort("-releaseDate");

      if (songs.length === 0) {
        return next({ message: "Song not found", statusCode: 404 });
      }

      res.status(200).json({ songs });
    } catch (error) {
      next(error);
    }
  }

  async getRecommended(req, res, next) {
    try {
      const pageSize = parseInt(req.query.limit) || 15;
      const currentPage = req.query.page;

      const songs = await Song.find()
        .populate({ path: "artistId", model: Artist })
        .select("songTitle songImage artistId")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort("songTitle");

      if (songs.length === 0) {
        return next({ message: "Song not found", statusCode: 404 });
      }

      res.status(200).json({ songs });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SongCtrl();
