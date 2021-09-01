// Adib's Code
const { Album, Artist, Song } = require("../models");

class AlbumCtrl {
  async getNewAlbums(req, res, next) {
    try {
      const pageSize = parseInt(req.query.limit) || 15;
      const currentPage = req.query.page;

      const albums = await Album.find({
        releaseDate: { $regex: new RegExp("^202[01].*") },
      })
        .populate({ path: "artistId", model: Artist })
        .select("albumTitle releaseDate albumImage artistId")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort("-releaseDate");

      res.status(200).json({ albums });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }
  async getAlbumByTitle(req, res, next) {
    try {
      const getTitle = req.query.title;
      const pageSize = parseInt(req.query.limit) || 15;
      const currentPage = req.query.page;
      const regex = new RegExp(getTitle, "i");

      const albums = await Album.find({ albumTitle: { $regex: regex } })
        .populate({ path: "artistId", model: Artist })
        .select("albumTitle albumImage artistId")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort("-releaseDate");

      if (albums.length === 0) {
        return next({ message: "Album not found.", statusCode: 404 });
      }
      res.status(200).json({ albums });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }

  async getDetailAlbum(req, res, next) {
    try {
      const album = await Album.findById(req.params.id)
        .populate({
          path: "songs",
          model: Song,
          select: "-artistId -albumId -__v",
        })
        .populate({
          path: "artistId",
          model: Artist,
          select: "name photo",
        });

      res.status(200).json({ album });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }
}

module.exports = new AlbumCtrl();
