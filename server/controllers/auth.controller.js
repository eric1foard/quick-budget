const db = require("../models");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Saves New User to Database
exports.signup = async (req, res) => {
  
  // First, check to see if username already exists.
  try {
    const user = await db.user.findOne({
      where: {
        username: req.body.username
      }
    })
    
    // If there is no one with that username, then create user.
    if (!user) {
      try {
        await db.user.create({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        })
        res.send({ message: "User was registered successfully!" });

      } catch(error) {
        res.status(500).send({ message: error.message });
      }
    } else {
      // If this username already exists, return this error and message
      return res.status(401).send({ message: "User already registered with this username." });
    }
  
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
  
};

// Signs in existing users.
exports.signin = async (req, res) => {
  
  // First, check to see if username exists already.
  try {
    const user = await db.user.findOne({
      where: {
        username: req.body.username
      }
    });

    // If not, then throw error and return message.
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Otherwise, hash user password
    const passwordIsValid = bcrypt.compareSync(
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
    const token = jwt.sign({ id: user.id }, process.env.REACT_APP_AUTH_CONFIG_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    // Return status 200, with jwt token.  Controller will set it in localstorage.
    res.status(200).send({
      accessToken: token,
      username: user.username, // Used to put username in navbar
    });

  } catch(error) {
    res.status(500).send({ message: error.message });
  }

};
