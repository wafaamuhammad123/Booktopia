const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const router = express.Router();
const usersController = require("../Controllers/UsersController.js");
const userValidation = require("../Utils/userValidation");
const cors = require("cors");
const multer = require("multer");

router.get("/users", usersController.getAllUsers);
router.post("/create",usersController.addNewUser);
router.post("/login", usersController.login);
router.delete("/delete/:id", usersController.DeleteUser);
router.get("/:id", usersController.getUserById);
module.exports = router;