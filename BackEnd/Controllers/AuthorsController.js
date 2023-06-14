const authorsModel = require("../Models/AuthorsModel");

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
 
};

let updateAuthor = async (req, res) => {
 
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