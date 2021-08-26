// Adib's Code
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const LikeSchema = new mongoose.Schema(
  {
    like: {
      type: Boolean,
      default: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    songId: {
      type: String,
      required: true,
      ref: "Song",
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

LikeSchema.index({ authorId: 1, songId: 1 }, { unique: true });

LikeSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("Like", LikeSchema);
