// Adib's Code
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

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
      type: String,
      required: false,
      default: "6969",
    },
    playlistImage: {
      type: String,
      required: true,
      default: "https://i1.sndcdn.com/artworks-000560586507-q7vve7-t500x500.jpg",
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

playlistSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("Playlist", playlistSchema);
