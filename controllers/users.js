// Rezki's Code
const { User } = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class Users {
  async getUserById(req, res, next) {
    try {
      const data = await User.findOne({ _id: req.params.id }).select("-password -__v");
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateDataUserById(req, res, next) {
    try {
      const data = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      }).select("-password -__v");
      if (!data) {
        return next({ message: "data not found", statusCode: 404 });
      }
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }
  async updatePasswordUserById(req, res, next) {
    try {
      let id = { _id: ObjectId(req.params.id) };
      let updatePassword = { password: req.body.password };
      const data = await User.patchUpdate(id, updatePassword, ["email"], "");
      res.status(201).json({ message: `password ${data.fullname} has been changed` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Users();
