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
  console.log("=======================");
  console.log("=======================");
  console.log("req: ", req.userId);
  console.log("=======================");
  console.log("=======================");
  User.findOne({
    where: {
      //could be the wrong thing .... check here
      id: req.userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found. Or is not logged in?" });
      }

      res.status(200).send({
        car: user.username
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};