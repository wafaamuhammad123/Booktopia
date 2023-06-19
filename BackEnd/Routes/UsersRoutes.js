const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/UsersController.js");
const userValidation = require("../Utils/userValidation");
const cors = require("cors");

//for Authorization
const admin = require("../permissions/userMWPermissions.js");
const authUser= require("../permissions/auth.js");

router.get("/users", admin, usersController.getAllUsers);
router.post("/create",usersController.addNewUser);
router.put("/user/:id", authUser, usersController.updateUser);
router.post("/login", usersController.login);
router.delete("/delete/:id", admin, usersController.DeleteUser);
router.get("/:id", authUser, usersController.getUserById);

module.exports = router;