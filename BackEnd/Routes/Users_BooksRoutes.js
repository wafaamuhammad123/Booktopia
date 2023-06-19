const express = require("express");
const router = express.Router();
const authorsController = require("../Controllers/AuthorsController.js");
const User_BooksController = require("../Controllers/User_BooksController.js");

router.get("/bookStatus/:id", User_BooksController.getBooksByStatus);
router.post("/chooseBook/:id",User_BooksController.chooseBook);
module.exports = router;