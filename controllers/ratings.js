// Adib's Code
const { Rating } = require("../models");

class RatingCtrl {
  async addRating(req, res, next) {
    try {
      const data = {
        rating: req.body.rating,
        playlistId: req.params.playlistId,
        authorId: req.user.user,
      };

      await Rating.create(data);
      res.status(201).json({ message: "Rating added." });
    } catch (error) {
      next(error);
    }
  }
  async updateRating(req, res, next) {
    try {
      const data = {
        rating: req.body.rating,
        playlistId: req.params.playlistId,
        authorId: req.user.user,
      };

      let rating = await Rating.findById(req.params.id);

      await Rating.updateOne({ _id: req.params.id }, req.body);

      // If success
      await rating.save();

      res.status(200).json({ message: "Rating updated." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RatingCtrl();
