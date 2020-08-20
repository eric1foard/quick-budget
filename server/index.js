// *********************************************************************************
// index.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const pino = require('express-pino-logger')();
const cors = require('cors');


// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3001;


// Sets up Cors
// =============================================================
var corsOptions = {
  origin: "http://localhost:3001"
}
app.use(cors(corsOptions));


// Requiring our models for syncing
// =============================================================
var db = require("./models");


// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino);


// Static directory
// =============================================================
app.use(express.static("app/public"));


// Can delete this
// =============================================================
app.get("/", (req, res) => {
  res.json({message: "Welcome to the application, yeah"})
})


// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});