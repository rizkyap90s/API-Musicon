// Adib's Code
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
// const { User } = require("../models");

const playlistSchema = new mongoose.Schema(
  {
    playlistTitle: {
      type: String,
      required: true,
      default: "Default Playlist",
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    playlistDuration: {
      type: Number,
      required: false,
      default: 0,
    },
    playlistImage: {
      type: String,
      required: true,
      default: "playlists/dafault/dafault-image-playlists.png",
      get: getPlaylistImage,
    },
    playlistRating: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { getters: true },
  }
);

function getPlaylistImage(img) {
  if (!img || img.includes("https") || img.includes("http")) {
    return img;
  }
  return process.env.S3_URL + img;
}
// playlistSchema.statics.pushToUser = async function (author, _id) {
//   try {
//     const getUser = await this.model("User").findOne({ _id: author });
//     getUser.playlists.push(_id);
//     getUser.save();
//   } catch (error) {
//     console.log(error);
//   }
// };

// playlistSchema.post("save", function () {
//   this.constructor.pushToUser(this.author, this._id);
// });

playlistSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("Playlist", playlistSchema);
