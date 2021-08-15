// Adib's Code
const { Song, Artist } = require("../models");

class SongCtrl {
  async getSongByTitle(req, res, next) {
    try {
      const getTitle = req.query.title;
      const pageSize = parseInt(req.query.limit) || 15;
      const currentPage = req.query.page;
      const regex = new RegExp(getTitle, "i");

      const song = await Song.find({ songTitle: { $regex: regex } })
        .populate({ path: "artistId", model: Artist })
        .select("songTitle songImage artistId")
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
}

module.exports = new SongCtrl();
