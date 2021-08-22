// Rezki's Code
const { User } = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt");

class Users {
  async getUserById(req, res, next) {
    try {
      const data = await User.findOne({ _id: req.params.id })
        .populate("playlists")
        .select("-password -__v");

      data._doc.total = data.playlists.length;
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateDataUserById(req, res, next) {
    try {
      if (req.file) {
        req.body.photo = "/" + req.file.path.split("/").slice(1).join("/");
      }
      const data = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      ).select("-password -__v");
      if (!data) {
        return next({ message: "User not found.", statusCode: 404 });
      }
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }
  async updatePasswordUserById(req, res, next) {
    try {
      req.body.password = req.body.newPassword;
      await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      });
      res.status(201).json({ message: `Password has been changed.` });
    } catch (error) {
      next(error);
    }
  }

  async userTopSong(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Users();
