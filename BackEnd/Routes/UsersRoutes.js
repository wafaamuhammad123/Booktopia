const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/UsersController.js");
//const validator = require("../middlewares/validator");
const userValidation = require("../Utils/userValidation");
const cors = require("cors");
const multer = require("multer");
// const admin = require("../middlewares/userMWPermissions");
// const auth = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/users", usersController.getAllUsers);
router.post("/create",upload.single("image"),usersController.addNewUser);

//router.post("/create",upload.single("image"), [validator(userSchema)], usersController.addNewUser);
router.post("/login", usersController.login);
router.put("/user/:id",upload.single("image"),usersController.updateUser);

router.delete("/delete/:id", usersController.DeleteUser);
router.get("/:id", usersController.getUserById);
module.exports = router;