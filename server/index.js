const express = require('express');
const axios = require('axios')
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

// const testAPIRouter = require("./routes/testAPI"); - example

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
// app.use('/testAPI', testAPIRouter); - example

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

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);