// *********************************************************************************
// index.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const pino = require('express-pino-logger')();

// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3001;


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// Static directory - do I need this?
app.use(express.static("app/public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);


// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

// app.get("/getData", (req, res) => {
//   axios.get("https://jsonplaceholder.typicode.com/posts")
//     .then(function(response) {
//       console.log(response.data)
//       res.json(response.data)
//     }).catch(function(error) {
//       res.json("Error occured!")
//     })
// })

// app.post("/getUserById", (req, res) => {
//   if (!req.body.id) {
//     res.json("No ID found in reqest body.")
//   } else {
//     axios.get(`https://jsonplaceholder.typicode.com/users/${req.body.id}`)
//       .then(function(response) {
//         res.json(response.data)
//       }).catch(function(error) {
//         res.json("Error occured!")
//       })
//   }
// })

app.listen(PORT, () => {
  console.log('App listening on on PORT ' + PORT);
});