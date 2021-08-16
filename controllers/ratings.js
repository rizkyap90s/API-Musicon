// Adib's Code
const { Rating } = require("../models");

class RatingCtrl {
  async addRating(req, res, next) {
    try {
      const data = {
        rating: req.body.rating,
        playlistId: req.body.playlistId,
        authorId: req.user.user,
      };

      console.log(data);
      //   const rating = await Rating.create(data);
      res.status(201).json({ message: "Rating added." });
    } catch (error) {
      next(error);
    }
  }
  async updateRating(req, res, next) {
    try {
      res.status(200).json({ message: "Rating updated." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RatingCtrl();
