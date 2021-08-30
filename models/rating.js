// Adib's Code
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const RatingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    playlistId: {
      type: String,
      required: true,
      ref: "Playlist",
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

RatingSchema.index({ authorId: 1, playlistId: 1 }, { unique: true });

// Static method to get average rating
RatingSchema.statics.getAverageRating = async function (playlistId) {
  const obj = await this.aggregate([
    {
      $match: { playlistId: playlistId },
    },
    {
      $group: {
        _id: "$playlistId",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("Playlist").findByIdAndUpdate(playlistId, {
      playlistRating: obj[0].averageRating.toFixed(1),
    });
  } catch (e) {
    /* istanbul ignore next */
    console.error(e);
  }
};

// call getAverageRating after save
RatingSchema.post("save", function () {
  this.constructor.getAverageRating(this.playlistId);
});

RatingSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("Rating", RatingSchema);
