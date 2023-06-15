const booksModel = require("../Models/BooksModel");

let getAllBooks = async (req, res) => {
  let data = await booksModel.find({}).populate("author_id", "name");
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
    const { title, year, pages, language, category, description, author_id } =  req.body;
    const imageFile = req.files["image"][0].filename;
    const recordLink = req.files["mp4"][0].filename;
    const pdfFile = req.files["pdf"][0].filename;

    const newBook = new booksModel({
      title,
      year,
      pages,
      imageLink: imageFile,
      recordLink,
      pdfLink: pdfFile,
      language,
      category,
      description,
      author_id,
    });
    const savedBook = await newBook.save();

    res.status(200).json({
      message: "Book created successfully",
      book: savedBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(422).json({ error: "Failed to create book" });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const bookDTO = req.body;

  const { image: imageFiles, mp3: recordFiles, pdf: pdfFiles } = req.files;

  const imageLink =
    imageFiles && imageFiles.length ? imageFiles[0].filename : undefined;
  const recordLink =
    recordFiles && recordFiles.length ? recordFiles[0].filename : undefined;
  const pdfLink =
    pdfFiles && pdfFiles.length ? pdfFiles[0].filename : undefined;

  try {
    const book = new booksModel({
      ...bookDTO,
      imageLink,
      recordLink,
      pdfLink,
      _id: id,
    });

    const newBook = await booksModel.findByIdAndUpdate(id, book, {
      new: true,
    });
    res.json(newBook);
  } catch (err) {
    res.status(400).json({ msg: "Could not update the book " + err.message });
  }
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
