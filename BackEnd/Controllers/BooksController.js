const booksModel = require("../Models/BooksModel");
const {uploadFiles} = require("../multer");
const cloudinary = require("cloudinary").v2;
let getAllBooks = async (req, res) => {
  const category = req.query.category;
  let data = [];
  if (category) {
    data = await booksModel.find({ category: category }).populate("author_id", "name");
  } else {
    data = await booksModel.find({}).populate("author_id", "name");
  }
  res.json(data);
  };

  let getBookById = async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let book = await booksModel.findById({ _id: id });
    res.json(book);
  };

let getBooksByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    if (!status || !['read', 'waiting', 'finished'].includes(status)) {
      return res.status(400).json({ message: "Invalid status parameter" });
    }

    // Retrieve books based on status
    const books = await booksModel.find({ status });

    res.status(200).json({ success: true, data: books });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving books" });
  }
};


let createBook = async (req, res) => {
  try {
    await uploadFiles(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error uploading file");
      } else {
        if(req.files){
          console.log(req.files);
        }
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
  }})} catch (error) {
    console.error("Error creating book:", error);
    res.status(422).json({ error: "Failed to create book" });
  }
};

const updateBook = async (req, res) => {
  try {
    await uploadFiles(req, res, async function (err) {
      if (err) {
        console.log("Error uploading file", err);
        return res.status(500).send("Error uploading file");
      }

      const { id } = req.params;
      const bookDTO = req.body;
      const { image: imageFiles, mp4: recordFiles, pdf: pdfFiles } = req.files;

      // Retrieve the existing book document
      const existingBook = await booksModel.findById(id);

      // Delete the old files from Cloudinary
      if (existingBook.imageLink && imageFiles) {
        const publicId = existingBook.imageLink.substring(
          existingBook.imageLink.lastIndexOf("/") + 1,
          existingBook.imageLink.lastIndexOf(".")
        );
        await cloudinary.uploader.destroy(publicId);
      }
      if (existingBook.recordLink && recordFiles) {
        const publicId = existingBook.recordLink.substring(
          existingBook.recordLink.lastIndexOf("/") + 1,
          existingBook.recordLink.lastIndexOf(".")
        );
        await cloudinary.uploader.destroy(publicId);
      }
      if (existingBook.pdfLink && pdfFiles) {
        const publicId = existingBook.pdfLink.substring(
          existingBook.pdfLink.lastIndexOf("/") + 1,
          existingBook.pdfLink.lastIndexOf(".")
        );
        await cloudinary.uploader.destroy(publicId);
      }

      // Get the file URLs or undefined if no file is uploaded
      const imageLink = imageFiles && imageFiles.length ? imageFiles[0].path : existingBook.imageLink;
      const recordLink = recordFiles && recordFiles.length ? recordFiles[0].path : existingBook.recordLink;
      const pdfLink = pdfFiles && pdfFiles.length ? pdfFiles[0].path : existingBook.pdfLink;

      // Create a new book object with updated data
      const updatedBook = {
        ...bookDTO,
        imageLink,
        recordLink,
        pdfLink,
      };

      // Find the book by ID and update it in the database
      const newBook = await booksModel.findByIdAndUpdate(id, updatedBook, {
        new: true,
      });

      res.json(newBook);
    });
  } catch (err) {
    res.status(400).json({ msg: "Could not update the book: " + err.message });
  }
};




let deleteBook = async (req, res) => {
  var id = req.params.id;

  try {
    var bookToDelete = await booksModel.findOne({ _id: id });
    // Delete image from Cloudinary
    if (bookToDelete.imageLink) {
      await cloudinary.uploader.destroy(bookToDelete.imageLink);
    }
    // Delete video from Cloudinary
    if (bookToDelete.recordLink) {
      await cloudinary.uploader.destroy(bookToDelete.recordLink);
    }
    // Delete PDF from Cloudinary
    if (bookToDelete.pdfLink) {
      await cloudinary.uploader.destroy(bookToDelete.pdfLink);
    }
    await booksModel.deleteOne({ _id: id });
    res.json(bookToDelete || "Not Found");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  getBooksByStatus,
  updateBook,
  deleteBook,
};
