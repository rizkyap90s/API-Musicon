// Rezki's Code
const jwt = require("jsonwebtoken");
const { User } = require("../models");

class Users {
  getToken(req, res, next) {
    try {
      const id = { user: req.user._id };
      const token = jwt.sign(id, process.env.JWT_SECRET);
      res.status(200).json({ id: req.user._id, token });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }
}
module.exports = new Users();
