// Adib's Code
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const songSchema = new mongoose.Schema(
  {
    songTitle: {
      type: String,
      required: true,
      default: "Default Song",
    },
    releaseDate: {
      type: String,
      required: true,
      default: "2020",
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Artist",
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Album",
    },
    songDuration: {
      type: String,
      required: true,
      default: "69",
    },
    songImage: {
      type: String,
      required: true,
      default: "https://i.redd.it/pts7n7ojjol11.jpg",
    },
    audio: {
      type: String,
      required: true,
      default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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

songSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Song", songSchema);
