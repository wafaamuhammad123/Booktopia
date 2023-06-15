const config = require("config");
const mongoose = require("mongoose");
var DB_URL = config.get("mongo.uri");
const mongoOptions = config.get("mongo.options");
mongoose.connect(DB_URL, mongoOptions);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const user_booksSchema = new mongoose.Schema({
    statue: {
        type: "string",
        enum: ['READING', 'READ', 'WANT_TO_READ'],
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    }
});
module.exports = mongoose.model("UserBooks", user_booksSchema);