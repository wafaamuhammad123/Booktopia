const authorsModel = require("../Models/AuthorsModel");
const cloudinary = require("cloudinary").v2;
const {uploadImageUser} = require("../multer");

let getAllAuthors = async (req, res) => {
  let data = await authorsModel.find({});
  res.json(data);

};

let getAuthorById = async (req, res) => {
  let id = req.params.id;
  let author = await authorsModel.findById({ _id: id });
  res.json(author);
};


let createAuthor = async (req, res) => {
  try {
    await uploadImageUser(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error uploading file");
      } else {
    const { name, aboutHim} =  req.body;
    const imageLink = req.file.path;
    const author= new authorsModel({
     name,
     imageLink,
     aboutHim
    });
    const savedAuthor= await author.save();

    res.status(200).json({
      message: "Author added Successfuly",
      author: savedAuthor,
    });
  }})} catch (error) {
    console.error("Error adding author:", error);
    res.status(422).json({ error: "Failed to add author" });
  }

};

let updateAuthor = async (req, res) => {
  try {
    await uploadImageUser(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error uploading file");
      } else {
        const { name, aboutHim } = req.body;
        const updatedFields = { name, aboutHim };
        if (req.file) {
            const existingAuthor = await authorsModel.findById(req.params.id);
          
          // Delete the old image from Cloudinary
          if (existingAuthor.imageLink) {
            await cloudinary.uploader.destroy(existingAuthor.imageLink);
          }
          updatedFields.imageLink = req.file.path;
        }

        const updatedAuthor = await authorsModel.findByIdAndUpdate(
          req.params.id,
          updatedFields,
          { new: true }
        );

        if (!updatedAuthor) {
          return res.status(404).json({ message: 'Author not found.' });
        }

        return res.json(updatedAuthor);
      }
    }); } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



let deleteAuthor = async (req, res) => {
  var id = req.params.id;
  var AuthorToDelete = await authorsModel.find({ _id: id });
  await authorsModel.deleteOne({ _id: id });
  res.json(AuthorToDelete || "Not Found");
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};