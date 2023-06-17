const UserBooksModel = require('../Models/User_BooksModel');
const booksModel = require('../Models/BooksModel');
var mongoose = require("mongoose");
const { ObjectId } = require('mongoose');
var Schema = mongoose.Schema;

let chooseBook= async(req, res)=>{
    console.log("body ",req.body);

    const { user_id, statue } = req.body;
    const book_id = req.params.id;
    try {
      // Check if user has already chosen the book
      const existingUserBook = await UserBooksModel.findOne({ user_id, book_id });
  
      if (existingUserBook) {
        // Update the status of the existing user book
        existingUserBook.statue = statue;
        await existingUserBook.save();
        res.json(existingUserBook);

      } else {
        // Create a new user book with the chosen status
        const newUserBook = new UserBooksModel({
            user_id,
            book_id,
            statue
        });
        await newUserBook.save();
        res.status(200).json({
            message: "Book created successfully",
            UserBooks: newUserBook,
          });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
let getBooksByStatus = async (req, res) => {
    try {
      const user_id = req.params.id;
      console.log(user_id);
      const books= await UserBooksModel.aggregate([{ $match: {user_id: new mongoose.Types.ObjectId( user_id)}},
        {
            $lookup: {
              from: "books",
              localField: "book_id",
              foreignField: "_id",
              as: "book",
            },
          },
        { $project: { _id: 0, book_id:0, user_id:0 } }
    ]);
    // console.log(books);
    //  books.map(b=>{
    //     console.log(b.book);
    //  })
      res.status(200).json({ success: true , books:books});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error retrieving books" });
    }
  };
  module.exports = {
    chooseBook,
    getBooksByStatus
  };