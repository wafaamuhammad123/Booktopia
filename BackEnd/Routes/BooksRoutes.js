const express = require("express");
const router = express.Router();
const booksController = require("../Controllers/BooksController.js");
// const validator = require("../middlewares/validator");
const cors = require("cors");
const multer = require("multer");
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

router.get("/books", booksController.getAllBooks);
// router.post("/create",upload.single("image"),booksController.createBook);
// router.put("/book/:id", upload.single("image"),booksController.updateBook);
router.delete("/delete/:id", booksController.deleteBook);
router.get("/:id", booksController.getBookById);

module.exports = router;