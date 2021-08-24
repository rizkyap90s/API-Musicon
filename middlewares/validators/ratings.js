// Adib's Code
const validator = require("validator");

exports.ratingValidator = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.playlistId)) {
      return next({ message: "Id is not valid", statusCode: 400 });
    }

    if (+req.body.rating > 5 || +req.body.rating < 0) {
      return next({
        message: "Rating must be in the range 0-5",
        statusCode: 400,
      });
    }

    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};

exports.getRatingValidator = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.playlistId)) {
      return next({ message: "Id is not valid", statusCode: 400 });
    }

    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
