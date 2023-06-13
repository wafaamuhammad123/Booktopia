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