const { Playlist, User } = require("../models");

exports.sendPushNotification = async (req, res, next) => {
  try {
    let socket_id = [];
    const io = req.app.get("socketio");
    const playlist = await Playlist.findById(req.params.playlistId)
      .select("author playlistTitle")
      .populate({ path: "author", model: User, select: "-password" });

    const user = await User.findById(req.user.user);
    const data = {
      playlist,
      ratedBy: user.username,
    };

    io.on("connection", (socket) => {
      socket_id.push(socket.id);
      if (socket_id[0] === socket.id) {
        // remove the connection listener for any subsequent
        // connections with the same ID
        io.removeAllListeners("connection");
      }

      socket.emit("newRating", JSON.stringify(data));
    });

    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
