// Dependencies
// =============================================================

// 'S'equelize references the standard library
var Sequelize = require("sequelize");
// 's'equelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Budget" model that matches up with DB
var Budget = sequelize.define("budget", {
  author: Sequelize.STRING,
  body: Sequelize.STRING,
  created_at: Sequelize.DATE
});

// Syncs with DB
Budget.sync();

// Makes the Budget Model available for other files (will also create a table)
module.exports = Budget;
