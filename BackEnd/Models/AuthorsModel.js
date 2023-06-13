const config = require("config");
const mongoose = require("mongoose");
var DB_URL = config.get("mongo.uri");
const mongoOptions = config.get("mongo.options");
mongoose.connect(DB_URL, mongoOptions);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const authorsSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  imageLink: {
    type: "string",
    required: true,
  },
  aboutHim: {
    type: "string",
    required: true,
  }
});
module.exports = mongoose.model("Author", authorsSchema);