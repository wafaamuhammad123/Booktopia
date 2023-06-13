const booksModel = require("../Models/BooksModel");

let getAllBooks = async (req, res) => {
  let data = await booksModel.find({});
  res.json(data);
};

let getBookById = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let book = await booksModel.findById({ _id: id });
  res.json(book);
};

let createBook = async (req, res) => {
  const body=req.body;
  const imageFile = req.files['image'][0].filename;
  const videoFile = req.files['mp4'][0].filename;
  const pdfFile = req.files['pdf'][0].filename;
  console.log(imageFile, videoFile, pdfFile)
  console.log(body);
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
