// Rezki's Code
const express = require("express");
const { getUserById, updateDataUserById, updatePasswordUserById } = require("../controllers/users");
const {
  getUserByIdValidator,
  updateDataValidator,
  updatePasswordValidator,
} = require("../middlewares/validators/users");

const router = express.Router();

router.get("/getuser/:id", getUserByIdValidator, getUserById);
router.put("/updatedata/:id", updateDataValidator, updateDataUserById);
router.patch("/updatepassword/:id", updatePasswordValidator, updatePasswordUserById);

module.exports = router;
