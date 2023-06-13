const config = require("config");
const mongoose = require("mongoose");
var DB_URL = config.get("mongo.uri");
const mongoOptions = config.get("mongo.options");
mongoose.connect(DB_URL, mongoOptions);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const booksSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  year: {
    type: "number",
    required: true,
  },
  pages: {
    type: "number",
    required: true,
  },
  imageLink: {
    type: "string",
    required: true,
  },
  recordLink: {
    type: "string",
    required: true,
  },
  language: {
    type: "string",
    required: true,
  },
  category: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
});
module.exports = mongoose.model("Book", booksSchema);