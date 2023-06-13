const booksModel = require("../Models/BooksModel");

let getAllBooks = async (req, res) => {

};

let getBookById = async (req, res) => {
  let id = req.params.id;
  let book = await booksModel.findById({ _id: id });
  res.json(book);
};

let createBook = async (req, res) => {
 
};

let updateBook = async (req, res) => {
 
};



let deleteBook = async (req, res) => {
  var id = req.params.id;
  var BookToDelete = await booksModel.find({ _id: id });
  await booksModel.deleteOne({ _id: id });
  res.json(BookToDelete || "Not Found");
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
