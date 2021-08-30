// Adib's Code
const validator = require("validator");

exports.getDetailValidator = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      return next({ message: "Id is not valid", statusCode: 400 });
    }

    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};

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
