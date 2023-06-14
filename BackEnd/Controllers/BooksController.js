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
  try {
    const { title, year, pages, language, category, description, author_id } = req.body;
    const imageFile = req.files['image'][0].filename;
    const videoFile = req.files['mp4'][0].filename;
    const pdfFile = req.files['pdf'][0].filename;

    const newBook = new booksModel({
      title,
      year,
      pages,
      imageLink: imageFile,
      recordLink: videoFile,
      pdfLink: pdfFile,
      language,
      category,
      description,
      author_id
    });
    const savedBook = await newBook.save();

    res.status(201).json({
      message: 'Book created successfully',
      book: savedBook
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
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
