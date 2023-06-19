const validate = require("../Utils/userValidation");
const usersModel = require("../Models/UsersModel");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const fs= require('fs');
const jwt = require("jsonwebtoken");
const { Console } = require("console");
const {uploadImageUser} = require("../multer");
let getAllUsers = async (req, res) => {
  let data = await usersModel.find({});
  res.json(data);
};

let addNewUser = async (req, res) => {
  try {
    await uploadImageUser(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error uploading file");
      } else {
    const { username, email, password, type } = req.body;
    console.log(req.body);
    const image = req.file.filename;
    if (!username || !email || !password || !type || !image) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    let testingUserByEmail = await usersModel.findOne({
      email: req.body.email,
    });
    let testingUserByUsername = await usersModel.findOne({
      username: req.body.username,
    });
    if (testingUserByEmail) {
      return res.status(400).send("Email already taken");
    } else if (testingUserByUsername) {
      return res.status(400).send("Username already taken");
    }
    const newUser = new usersModel({
      username,
      email,
      password,
      type,
      image
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const savedUser = await newUser.save();
    
    

    return res.status(201).json({
      message: "User created successfully",
      User: savedUser,
    });
  }})} catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating user" });
  }
};


//update
let updateUser = async (req, res) => {
  console.log(req.body);
  try {
    await uploadImageUser(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error uploading file");
      } else {
        const { username, email, password, type } = req.body;
        const updatedFields = { username, email, password, type };
        if (req.file) {
          // Retrieve the existing user document
          const existingUser = await usersModel.findById(req.params.id);
          
          // Delete the old image from Cloudinary
          if (existingUser.image) {
            await cloudinary.uploader.destroy(existingUser.image);
          }

          // Set the new image filename
          updatedFields.image = req.file.filename;
        }

        const updatedUser = await usersModel.findByIdAndUpdate(
          req.params.id,
          updatedFields,
          { new: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found.' });
        }

        return res.json(updatedUser);
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


let login = async (req, res) => {
  const { email, password } =req.body;
  let user = await usersModel.findOne({ email: email });
  let checkPassword = await bcrypt.compare(password, user.password);
  console.log(checkPassword);
  if (!checkPassword) {
    return res.status(400).send("Invalid email or password");
  }
  let Token = jwt.sign(
    {
      userId: user._id,
      userType: user.type,
    },
    "thistokensecret"
  );

  res.header("x-auth-token", Token);
  return res.status(200).json({ user: user, token: Token });
};

const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userToDelete = await usersModel.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    const imagePublicId = userToDelete.image;
    if (imagePublicId) {
      await cloudinary.uploader.destroy(imagePublicId);
    }
    await usersModel.deleteOne({ _id: id });

    res.json(userToDelete);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
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