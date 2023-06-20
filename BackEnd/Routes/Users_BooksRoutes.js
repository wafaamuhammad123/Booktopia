const express = require("express");
const router = express.Router();
const authorsController = require("../Controllers/AuthorsController.js");
const User_BooksController = require("../Controllers/User_BooksController.js");

router.get("/bookStatus/:id", User_BooksController.getBooksByStatus);
router.post("/createUserBook/:id",User_BooksController.createUserBook);
router.put("/updateUserBook/:id",User_BooksController.updateUserBookStatus);
module.exports = router;