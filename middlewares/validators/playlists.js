const validator = require("validator");
const { Playlist, Song } = require("../../models");
exports.getPlaylistByIdValidator = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      return next({ message: "Id is not valid", statusCode: 400 });
    }
    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
exports.addAndRemoveSongValidator = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.playlistid) || !validator.isMongoId(req.params.songid)) {
      return next({ message: "id is not valid", statusCode: 400 });
    }
    const isPlaylistExist = await Playlist.findById(req.params.playlistid);
    const isSongExist = await Song.findById(req.params.songid);
    if (!isPlaylistExist) return next({ message: "Playlist not found", statusCode: 400 });
    if (!isSongExist) return next({ message: "Song not found", statusCode: 400 });
    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
exports.deletePlaylistValidator = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      return next({ message: "id is not valid", statusCode: 400 });
    }
    const isPlaylistExist = await Playlist.findById(req.params.id);
    if (!isPlaylistExist) return next({ message: "Playlist not found", statusCode: 400 });
    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
