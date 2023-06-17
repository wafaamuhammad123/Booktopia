const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/UsersController.js");
const userValidation = require("../Utils/userValidation");
const cors = require("cors");

router.get("/users", usersController.getAllUsers);
router.post("/create",usersController.addNewUser);
router.put("/user/:id", usersController.updateUser);
router.post("/login", usersController.login);
router.delete("/delete/:id", usersController.DeleteUser);
router.get("/:id", usersController.getUserById);
module.exports = router;