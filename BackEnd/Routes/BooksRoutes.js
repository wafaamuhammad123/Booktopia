const express = require("express");
const router = express.Router();
const booksController = require("../Controllers/BooksController.js");
// const validator = require("../middlewares/validator");
const cors = require("cors");
const multer = require("multer");
// const admin = require("../middlewares/userMWPermissions");
// const auth = require("../middlewares/auth");

router.get("/books", booksController.getAllBooks);
router.post("/create", booksController.createBook);
router.put("/book/:id", booksController.updateBook);
router.delete("/delete/:id", booksController.deleteBook);
router.get("/:id", booksController.getBookById);

module.exports = router;
