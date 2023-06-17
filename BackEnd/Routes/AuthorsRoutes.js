const express = require("express");
const router = express.Router();
const authorsController = require("../Controllers/AuthorsController.js");
// const validator = require("../middlewares/validator");
//const cors = require("cors");
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

router.get("/authors", authorsController.getAllAuthors);
 router.post("/create",upload.single("image"),authorsController.createAuthor);
  router.put("/author/:id", upload.single("image"),authorsController.updateAuthor);
router.delete("/delete/:id", authorsController.deleteAuthor);
router.get("/:id", authorsController.getAuthorById);

module.exports = router;