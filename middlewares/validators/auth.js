// Rezki's Code
const validator = require("validator");

exports.signUpValidator = async (req, res, next) => {
  try {
    const errorMessages = [];
    if (validator.isEmpty(req.body.fullname) || validator.isEmpty(req.body.username)) {
      errorMessages.push("field can't be empty");
    }
    if (!validator.isEmail(req.body.email)) {
      errorMessages.push("your email is not valid");
    }
    if (!validator.isStrongPassword(req.body.password)) {
      errorMessages.push("your password is not strong enough");
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }
    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};

exports.signInValidator = async (req, res, next) => {
  try {
    const errorMessages = [];
    if (req.body.email) {
      if (!validator.isEmail(req.body.email)) {
        errorMessages.push("email is not valid");
      }
    }
    if (validator.isEmpty(req.body.password)) {
      errorMessages.push("field can't be empty");
    }
    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }
    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
