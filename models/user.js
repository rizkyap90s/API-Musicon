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
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: "playlist",
      },
    ],
    photo: {
      type: String,
      required: false,
      // get: getImage,
      default:
        "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

function setPassword(password) {
  return bcrypt.hashSync(password, 10);
}

// function getImage(img) {
//   if (!img || img.includes("https") || img.includes("http")) {
//     return img;
//   }
//   return `/images/users/${img}`;
// }
userSchema.plugin(mongoosePatchUpdate);
userSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("user", userSchema);
