const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const imgStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Musicon/imgs",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const songStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Musicon/mp3s",
    allowedFormats: ["mp3"],
  },
});

module.exports = { cloudinary, imgStorage, songStorage };
