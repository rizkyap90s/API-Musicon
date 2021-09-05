// Rezki's Code
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const mongoosePatchUpdate = require("mongoose-patch-update");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requires: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: setPassword,
    },
    // playlists: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: false,
    //     ref: "playlist",
    //   },
    // ],
    photo: {
      type: String,
      required: false,
      get: getPhoto,
      default: "users/dafault/dafault-image-users.jpeg",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },

    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
  }
);

function setPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function getPhoto(img) {
  if (!img || img.includes("https") || img.includes("http")) {
    return img;
  }
  return process.env.S3_URL + img;
}
userSchema.virtual("playlists", {
  ref: "Playlist",
  localField: "_id",
  foreignField: "author",
  justOne: false,
});

userSchema.plugin(mongoosePatchUpdate);
userSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("User", userSchema);
