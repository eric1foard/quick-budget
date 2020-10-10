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
const path = require('path') 


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
app.use(express.static(path.join(__dirname, 'client/build')));



// Routes
// =============================================================
require("./server/routes/auth.routes")(app);
require("./server/routes/user.routes")(app);

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
});




// Syncing our sequelize models and then starting our Express app
// =============================================================
var PORT = process.env.PORT || process.env.REACT_APP_SERVER_PORT || 3001;
db.sequelize.sync({ force: false }).then(function() {
  console.log("db synced");
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});