// Rezki's Code
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requires: true,
      unique: true,
    },
    albums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: "Album",
      },
    ],
    photo: {
      type: String,
      required: false,
      // get: getImage,
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

// function getImage(img) {
//   if (!img || img.includes("https") || img.includes("http")) {
//     return img;
//   }
//   return `/images/artists/${img}`;
// }
artistSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("artist", artistSchema);
