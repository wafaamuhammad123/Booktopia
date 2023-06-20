const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: function (req, file) {
    let folder;
    let resource_type;
    if (file.fieldname === "image") {
      folder = "images";
      resource_type = "image";
      access_mode= "public"
    } else if (file.fieldname === "mp4") {
      folder = "videos";
      resource_type = "video";
      access_mode= "public"
    } else if (file.fieldname === "pdf") {
      folder = "pdfs";
      resource_type = "auto";
      access_mode= "public";
      // Content_Disposition = "attachment";
    }

    return {
      folder,
      resource_type,
      access_mode,
    };
  },
});


module.exports = {
  imageStorage,
  storage
};
