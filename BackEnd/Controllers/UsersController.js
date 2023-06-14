const validate = require("../Utils/userValidation");
const usersModel = require("../Models/UsersModel");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const fs= require('fs');
const jwt = require("jsonwebtoken");
const { Console } = require("console");

let getAllUsers = async (req, res) => {
  let data = await usersModel.find({});
  res.json(data);
};

let addNewUser = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password, type } = req.body;

    if (!req.file || !req.file.filename) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const image = req.file.filename;

    if (!username || !email || !password || !type) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    // Rest of your code for creating a new user

    // Example:
    const newUser = new usersModel({
      username,
      email,
      password,
      type,
      image,
    });

    // Save the user and return the response

    return res.status(201).json({
      message: "User created successfully",
      User: newUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating user" });
  }
};
//update
let updateUser = async (req, res) => {
  console.log(req.body)
  try {
    const updatedUser = await usersModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

let login = async (req, res) => {
 
};

let DeleteUser = async (req, res) => {
    var id = req.params.id;
    var userToDelete = await usersModel.find({ _id: id });
    await usersModel.deleteOne({ _id: id });
    res.json(userToDelete || "Not Found");
  
};


let getUserById = async (req, res) => {
  let id = req.params.id;
  let user = await usersModel.findById({ _id: id });
  res.json(user);
};

module.exports = {
  getAllUsers,
  addNewUser,
  login,
  updateUser,
  DeleteUser,
  getUserById,
};