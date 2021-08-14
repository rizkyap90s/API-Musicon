// Rezki's Code
const { User } = require("../models");

class Users {
  async getUserById(req, res, next) {
    try {
      const data = await User.findOne({ _id: req.params.id }).select("-password -__v");
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Users();
