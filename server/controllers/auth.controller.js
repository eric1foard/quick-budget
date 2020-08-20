const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


exports.signup = (req, res) => {
  // Save User to Database
  console.log("======================")
  console.log("req.body: ", req.body)
  console.log("req.body.username: ", req.body.username)
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    money: 0,
    cars: 0
  })
    .then(user => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compare(req.body.password, config.secret, function(err, result) {
        console.log(err);
        console.log(result);
      });

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};