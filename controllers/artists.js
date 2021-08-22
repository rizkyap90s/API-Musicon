const { Artist, Album } = require("../models");
const artist = require("../models/artist");

class Artists {
  async getArtistById(req, res, next) {
    try {
      const data = await Artist.findById(req.params.id).populate("albums");
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
  async getArtistByTitle(req, res, next) {
    try {
      const getName = req.query.name;
      const pageSize = parseInt(req.query.limit) || 15;
      const currentPage = req.query.page;
      const regex = new RegExp(getName, "i");

      const artist = await Artist.find({ name: { $regex: regex } })
        // .populate({ path: "author", model: User })
        // .select("playlistTitle playlistImage author")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort("-releaseDate");

      if (artist.length === 0) {
        return next({ message: "Artist not found.", statusCode: 404 });
      }

      res.status(200).json({ artist });
    } catch (error) {
      next(error);
    }
  }
  async getNewReleaseArtist(req, res, next) {
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

      if (albums.length === 0) {
        return next({ message: "Album not found", statusCode: 404 });
      }
      const data = [];
      for (let i = 0; i < albums.length; i++) {
        const getArtist = await Artist.find({ _id: albums[i].artistId });
        data.push(getArtist);
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Artists();
