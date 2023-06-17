const express = require("express");
const router = express.Router();
const authorsController = require("../Controllers/AuthorsController.js");

// const cors = require("cors");
const multer = require("multer");

//for Authorization
const admin = require("../permissions/userMWPermissions.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/authors", admin, authorsController.getAllAuthors);
router.post("/create",upload.single("image"),authorsController.createAuthor);
router.put("/author/:id", upload.single("image"),authorsController.updateAuthor);
router.delete("/delete/:id", admin, authorsController.deleteAuthor);
router.get("/:id", admin, authorsController.getAuthorById);

module.exports = router;