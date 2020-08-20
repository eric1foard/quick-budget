module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    money: DataTypes.INTEGER,
    cars: DataTypes.STRING,
  }, {
    timestamps: false
  });

  // Author.associate = function(models) {
  //   // Associating Author with Posts
  //   // When an Author is deleted, also delete any associated Posts
  //   Author.hasMany(models.Post, {
  //     onDelete: "cascade"
  //   });
  // };

  return User;
};



// // Dependencies
// // =============================================================

// // 'S'equelize references the standard library
// var Sequelize = require("sequelize");
// // 's'equelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// // Creates a "Budget" model that matches up with DB
// var Budget = sequelize.define("budget", {
//   user_name: Sequelize.STRING,
//   money: Sequelize.INTEGER,
// }, {
//   timestamps: false
// });

// // Syncs with DB
// Budget.sync();

// // Makes the Budget Model available for other files (will also create a table)
// module.exports = Budget;
