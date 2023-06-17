const {imageStorage, storage } = require("./storage.js");
const multer = require("multer");
const upload = multer({storage:storage});

const uploadFiles = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mp4", maxCount: 1},
    { name: "pdf", maxCount: 1},
  ]);
;

const uploadImageUser = multer({ storage: imageStorage }).single("image");
module.exports = {
  uploadImageUser,
  uploadFiles
};
