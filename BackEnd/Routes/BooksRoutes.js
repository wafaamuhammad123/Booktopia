const express = require("express");
const router = express.Router();
const booksController = require("../Controllers/BooksController.js");
// const validator = require("../middlewares/validator");
const cors = require("cors");
const multer = require("multer");

//for Authorization
const admin = require("../permissions/userMWPermissions.js");
const authUser= require("../permissions/auth.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "uploads/"); // Destination folder for images
    } else if (file.fieldname === "mp4") {
      cb(null, "videos/"); // Destination folder for videos
    } else if (file.fieldname === "pdf") {
      cb(null, "files/"); // Destination folder for pdfs
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/books", authUser, booksController.getAllBooks);
router.post(
  "/create",
  admin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mp4", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  booksController.createBook
);
router.put(
  "/book/:id",
  admin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mp4", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  booksController.updateBook
);
router.delete("/delete/:id", admin, booksController.deleteBook);
router.get("/:id", authUser, booksController.getBookById);

module.exports = router;
