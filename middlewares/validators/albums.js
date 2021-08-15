// Adib's Code
const validator = require("validator");

exports.queryValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (req.query.page) {
      if (!validator.isInt(req.query.page)) {
        errorMessages.push("Page request must be a number (Int)");
      }
    }
    if (req.query.limit) {
      if (!validator.isInt(req.query.limit)) {
        errorMessages.push("Limit request must be a number (Int)");
      }
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
