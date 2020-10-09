// *********************************************************************************
// index.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Environment Variables
// =============================================================
require('dotenv').config();

// Dependencies
// =============================================================
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');


// Sets up the Express App
// =============================================================
const app = express();


// Sets up Cors
// =============================================================
var corsOptions = {
  origin: "http://localhost:3000"
}
app.use(cors(corsOptions));


// Requiring our models for syncing
// =============================================================
var db = require("./server/models");


// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino);


// Static directory
// =============================================================
  // Express only serves static assets in production - (CB 10/8 - testing this)
  if (process.env.NODE_ENV === "production") {
    console.log("YES production.  App serving app/client/build")
    app.use(express.static("app/client/build"));
  } else {
    console.log("NOT production.  App serving app/client/public")
    app.use(express.static("app/client/public"));
  }


// Routes
// =============================================================
require("./server/routes/auth.routes")(app);
require("./server/routes/user.routes")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});


// Syncing our sequelize models and then starting our Express app
// =============================================================
var PORT = process.env.REACT_APP_SERVER_PORT || process.env.PORT || 3001;
db.sequelize.sync({ force: false }).then(function() {
  console.log("db synced");
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});