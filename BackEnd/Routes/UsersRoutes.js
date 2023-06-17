const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/UsersController.js");
// const validator = require("../permissions/validator");
const userValidation = require("../Utils/userValidation");
const cors = require("cors");
const multer = require("multer");

//for Authorization
const admin = require("../permissions/userMWPermissions.js");
const authUser= require("../permissions/auth.js");


// const upload= require('../multer.js');
const { uploadProduct } = require("../multer.js");

// const admin = require("../middlewares/userMWPermissions");
// const auth = require("../middlewares/auth");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });




router.get("/users", admin, usersController.getAllUsers);

router.post("/create",uploadProduct,usersController.addNewUser);

router.post("/login", usersController.login);
// router.put("/user/:id", auth, upload.single("image"),usersController.updateUser);

router.delete("/delete/:id", admin, usersController.DeleteUser);
router.get("/:id", authUser, usersController.getUserById);
module.exports = router;