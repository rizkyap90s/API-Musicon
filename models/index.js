require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true, // Enable unique
    useNewUrlParser: true, // Must be true
    useUnifiedTopology: true, // Must be true
    useFindAndModify: false, // to use updateOne and updateMany
  })
  .then(() => console.log("MongoDB Connected"))
  /* istanbul ignore next */
  .catch((err) => console.log(err));

exports.Album = require("./album");
exports.Artist = require("./artist");
exports.Playlist = require("./playlist");
exports.Song = require("./song");
exports.User = require("./user");
