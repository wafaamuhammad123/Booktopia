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
  try {
    const { name, aboutHim} =  req.body;
    const imageFile = req.files["image"][0].filename;
    const author= new authorsModel({
     name,
     imageFile,
     aboutHim
    });
    const savedAuthor= await author.save();

    res.status(200).json({
      message: "Author added Successfuly",
      book: savedAuthor,
    });
  } catch (error) {
    console.error("Error adding author:", error);
    res.status(422).json({ error: "Failed to add author" });
  }

};

let updateAuthor = async (req, res) => {


try{
  let authorID = req.params.id;
   console.log(req.body);
  let author= await authorsModel.findOneAndUpdate(
      { _id: authorID},
      req.body,
      { new: true}
    );

  if (!author) {
    throw new NotFoundError(`Author Not Found`);
  }
}catch (err) {
    res.status(400).json({ msg: "Could not update Author" + err.message });
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