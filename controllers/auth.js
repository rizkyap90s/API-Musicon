// Rezki's Code
const jwt = require("jsonwebtoken");
const { User } = require("../models");

class Users {
  async getToken(req, res, next) {
    try {
      const id = { user: req.user._id };
      const loggedUser = await User.findById(id.user).select("-password -__v");

      const token = jwt.sign(id, process.env.JWT_SECRET);
      res.status(200).json({ loggedUser, token });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }
}
module.exports = new Users();
