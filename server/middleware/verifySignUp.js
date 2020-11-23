const db = require("../models");
const User = db.User;

// NOTE (CB 10/4) - this file was originally to be used for verifying during SignUp whether the 
// ... username was already in use.  Began throwing errors (cannot change headers after
// ... they have already been sent to client).  So, this is currently unused.
const checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

  });
  next();
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
};

module.exports = verifySignUp;