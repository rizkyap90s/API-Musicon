const app = require("../app");
const { Playlist, User, Rating } = require("../models");

exports.sendPushNotification = async (req, res, next) => {
  try {
    const io = req.app.locals.io;

    const playlist = await Playlist.findById(req.params.playlistId)
      .select("author playlistTitle")
      .populate({ path: "author", model: User, select: "-password" });

    const user = await User.findById(req.user.user).select("-password");
    const data = { playlist, rating: req.body.rating, ratedBy: user };

    io.emit("newRating", data);

    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
