const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.userCar = (req, res) => {
  res.status(200).send("Car Content.");
  // User.findOne({
  //   where: {
  //     username: 
  //   }
  // })
}