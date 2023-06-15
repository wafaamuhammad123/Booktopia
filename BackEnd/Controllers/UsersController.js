const validate = require("../Utils/userValidation");
const usersModel = require("../Models/UsersModel");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const fs= require('fs');
const jwt = require("jsonwebtoken");

let getAllUsers = async (req, res) => {
  let data = await usersModel.find({});
  res.json(data);
};

let addNewUser = async (req, res) => {
  console.log(req.body);
  // console.log(req.file);
  try {
    const { username, email, password, type } = req.body;
    const imageFile = req.files["image"][0].filename;
    console.log("imageFile:");
    console.log(imageFile);
    
    const image = req.file;
    console.log("image:");
    console.log(image);
    
    // Rest of your code for creating a new user

    // Example:
    const newUser = new usersModel({
      username,
      email,
      password,
      type,
      image
    });

    // Save the user and return the response
    const savedUser = await newUser.save();
    
    return res.status(201).json({
      message: "User created successfully",
      User: savedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating user" });
  }
};

//update
let updateUser = async (req, res) => {

}

let login = async (req, res) => {
 
};

let DeleteUser = async (req, res) => {
 
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