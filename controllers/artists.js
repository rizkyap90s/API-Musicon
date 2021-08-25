const { Artist, Playlist, Album } = require("../models");

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
      const getArtists = await Artist.find().populate({
        path: "albums",
        model: Album,
      });

      const newRelease = getArtists.filter(
        (artist) => artist.albums[0].releaseDate.slice(0, 3) === "202"
      );

      console.log(newRelease);
      res.status(200).json({ newRelease });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Artists();
