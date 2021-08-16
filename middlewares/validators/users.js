// Rezki's Code
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

exports.getUserByIdValidator = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({ messages: "id not Valid", statusCode: 400 });
    }
    next();
  } catch (error) {
    next(error);
  }
};
exports.updateDataValidator = async (req, res, next) => {
  try {
    const errorMessages = [];
    // console.log(req.body.username);
    // if (validator.isEmpty(req.body.username) || validator.isEmpty(req.body.fullname)) {
    //   errorMessages.push("field can't be empty");
    // }
    // if (!validator.isEmail(req.body.email)) {
    //   errorMessages.push("your email is not valid");
    // }

    // if (errorMessages.length > 0) {
    //   return next({ messages: errorMessages, statusCode: 400 });
    // }
    next();
  } catch (error) {
    next(error);
  }
};

exports.updatePasswordValidator = async (req, res, next) => {
  try {
    // console.log(typeof req.body.newPassword);
    if (!validator.isStrongPassword(req.body.newPassword)) {
      return next({ messages: "your password is not strong enough", statusCode: 400 });
    }

    const currentPassword = req.body.currentPassword;
    const user = await User.findById(req.user.user).select("password");

    const valid = await bcrypt.compare(currentPassword, user.password);
    console.log(valid);
    if (!valid) {
      return next({ messages: "Wrong password", statusCode: 403 });
    }
    next();
  } catch (error) {
    next(error);
  }
};
