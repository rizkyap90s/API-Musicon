// Rezki's Code
const mongoose = require("mongoose");

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
