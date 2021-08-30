const validator = require("validator");

exports.getLikeValidator = async (req, res, next) => {
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
exports.setLikeValidator = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      return next({ message: "Id is not valid", statusCode: 400 });
    }
    if (!validator.isBoolean(req.body.like)) {
      return next({ message: "Input not valid", statusCode: 400 });
    }
    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
