const express = require("express");
const router = express.Router();
const booksController = require("../Controllers/BooksController.js");
// const validator = require("../middlewares/validator");
const cors = require("cors");
const multer = require("multer");
// const admin = require("../middlewares/userMWPermissions");
// const auth = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "public/uploads/"); // Destination folder for images
    } else if (file.fieldname === "mp4") {
      cb(null, "public/videos/"); // Destination folder for videos
    } else if (file.fieldname === "pdf") {
      cb(null, "public/files/"); // Destination folder for pdfs
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get("/books", booksController.getAllBooks);
router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mp4", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  booksController.createBook
);
router.put(
  "/book/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mp4", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  booksController.updateBook
);
router.delete("/delete/:id", booksController.deleteBook);
router.get("/:id", booksController.getBookById);

module.exports = router;
