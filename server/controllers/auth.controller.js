const db = require("../models");
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Saves New User to Database
exports.signup = (req, res) => {
  
  // First, check to see if username already exists.
  db.User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      // If there is no one with that username, then create user.
      if (!user) {
        db.User.create({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        })
          .then(user => {
              res.send({ message: "User was registered successfully!" });
            })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      } else {
        // If this username already exists, return this error and message
        return res.status(401).send({ message: "User already registered with this username." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};

// Signs in existing users.
exports.signin = (req, res) => {
  
  // First, check to see if username exists already.
  db.User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      // If not, then throw error and return message.
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
      
      // Otherwise, hash user password
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      // Create jwt token for the user, used to identify users in API calls
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      // Return status 200, with jwt token.  Controller will set it in localstorage.
      res.status(200).send({
        accessToken: token
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};