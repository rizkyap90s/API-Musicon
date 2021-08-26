// Adib's Code
const { Like } = require("../models");

class LikeCtrl {
  async getLike(req, res, next) {
    try {
      const data = await Like.findOne({
        songId: req.params.id,
        authorId: req.user.user,
      });

      if (!data) {
        res.status(200).json({ like: false });
      } else {
        res.status(200).json({ like: data.like });
      }
    } catch (error) {
      next(error);
    }
  }

  async createOrUpdateLike(req, res, next) {
    try {
      const data = await Like.findOne({
        songId: req.params.id,
        authorId: req.user.user,
      });

      if (data) {
        const updateLike = await Like.findOneAndUpdate(
          {
            songId: req.params.id,
            authorId: req.user.user,
          },
          req.body,
          {
            new: true,
          }
        );
        updateLike.save();
      } else {
        req.body.songId = req.params.id;
        req.body.authorId = req.user.user;
        await Like.create(req.body);
      }

      res.status(201).json({ message: "Like is added/ updated." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LikeCtrl();
