// Rezki's Code
const express = require("express");
const { getUserById, getAllUser } = require("../controllers/users");
const { getUserByIdValidator } = require("../middlewares/validators/users");

const router = express.Router();

router.get("/getuser/:id", getUserByIdValidator, getUserById);

module.exports = router;
