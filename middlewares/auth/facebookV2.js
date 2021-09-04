const { User } = require("../../models");
const bcrypt = require("bcrypt");

exports.facebookLoginSanitizerValidator = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const isFacebook = await bcrypt.compare("facebook", user.password);

      if (!isFacebook) {
        next({
          statusCode: 401,
          message: "Please login using another method.",
        });
      }
    }

    req.body.username = req.body.email.split("@")[0];
    req.body.fullname = req.body.fullname;
    req.body.photo = req.body.imageUrl;
    req.body.email = req.body.email;
    req.body.password = "facebook";

    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
