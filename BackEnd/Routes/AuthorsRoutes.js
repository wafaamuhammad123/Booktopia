const express = require("express");
const router = express.Router();
const authorsController = require("../Controllers/AuthorsController.js");

// const cors = require("cors");
const multer = require("multer");

//for Authorization
const admin = require("../permissions/userMWPermissions.js");
const authUser= require("../permissions/auth.js");


router.get("/authors", authUser, authorsController.getAllAuthors);
router.post("/create", admin,authorsController.createAuthor);
router.put("/author/:id", admin,authorsController.updateAuthor);
router.delete("/delete/:id", admin, authorsController.deleteAuthor);
router.get("/:id", authUser, authorsController.getAuthorById);

module.exports = router;