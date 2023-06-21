const express = require("express");
const router = express.Router();
const booksController = require("../Controllers/BooksController.js");

const cors = require("cors");
const multer = require("multer");

//for Authorization
const admin = require("../permissions/userMWPermissions.js");
const authUser= require("../permissions/auth.js");

router.get("/books", authUser, booksController.getAllBooks);
router.post("/create", admin, booksController.createBook);
router.put("/book/:id", admin, booksController.updateBook);
router.delete("/delete/:id", admin, booksController.deleteBook);
router.get("/booksByAuthor/:id", authUser, booksController.getBooksByAuthorId)
router.get("/:id", booksController.getBookById);

module.exports = router;