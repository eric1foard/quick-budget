// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Budget = require("../models/Budget.js");


// Routes
// =============================================================
module.exports = function(app) {

  // Get all chirps
  app.get("/api/all", async function(req, res) {

    // Finding all Budget, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function

    // const budget = await Budget.findAll();
    // console.log(budget.every(budget => budget instanceof Budget)); // true
    // console.log("All users:", JSON.stringify(budget, null, 2));


    Budget.findAll({}).then(function(results) {
      // results are available to us inside the .then
      console.log("made it into api call")
      // console.log("res: ", res);
      console.log("results: ", results);
      res.json(results);
    });

  });

  // Add a chirp
  app.post("/api/new", function(req, res) {

    console.log("Budget Data:");
    console.log(req.body);

    Budget.create({
      user_name: req.body.author,
      money: req.body.body,
    }).then(function(results) {
      // `results` here would be the newly created Budget
      res.end();
    });

  });

};