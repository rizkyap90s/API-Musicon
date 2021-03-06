// Adib's Code
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const albumSchema = new mongoose.Schema(
  {
    albumTitle: {
      type: String,
      required: true,
      default: "Default Album",
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    releaseDate: {
      type: String,
      required: true,
      default: "1969",
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Artist",
    },
    albumDuration: {
      type: Number,
      required: true,
      default: 0,
    },
    albumImage: {
      type: String,
      required: true,
      default: "https://i.redd.it/pts7n7ojjol11.jpg",
    },
    spotifyId: {
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

albumSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("Album", albumSchema);
