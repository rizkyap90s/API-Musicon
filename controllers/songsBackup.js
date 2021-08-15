// Adib's Code
const { Song } = require("../models");

class SongCtrl {
  async getSongByTitle(req, res, next) {
    try {
      const getTitle = req.query.title;
      const pageSize = parseInt(req.query.limit) || 15;
      const currentPage = req.query.page;
      const regex = new RegExp(getTitle, "i");

      const song = await Song.find({ songTitle: { $regex: regex } })
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
