const { storage } = require("./storage.js");
const multer = require("multer");
const uploadProduct = multer({ storage }).single("image");

module.exports = {
  uploadProduct,
};
