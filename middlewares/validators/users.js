// Rezki's Code
const mongoose = require("mongoose");
const validator = require("validator");

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
    // if (validator.isEmpty(req.body.username) || validator.isEmpty(req.body.fullname)) {
    //   errorMessages.push("field can't be empty");
    // }
    // if (!validator.isEmail(req.body.email)) {
    //   errorMessages.push("your email is not valid");
    // }
    // if (!validator.isStrongPassword(req.body.password)) {
    //   errorMessages.push("your password is not strong enough");
    // }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.updatePasswordValidator = async (req, res, next) => {
  try {
    if (!validator.isStrongPassword(req.body.password)) {
      return next({ messages: "your password is not strong enough", statusCode: 400 });
    }
    next();
  } catch (error) {
    next(error);
  }
};
