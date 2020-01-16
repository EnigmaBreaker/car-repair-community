// This is the main file where server begins

const express = require('express');
const bodyParser = require('body-parser')
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;

// Used mongoose to better connect with the database. Connection is done here. Database config is stored in config folder.
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


// Used express and body parser libraries to run the server.
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// CORS is required to allow cross origin Resource sharing. Since, it is an API, it is required.
app.use(cors())

// This is just a message when someone tries to access root of the API.
app.get('/', (req, res) => {
  res.json({"message": "You are contacting car-group. "});
})

// Imports routes for user and post. These are seperated for better modularity of the code.
require('./users/routes/user.routes')(app);
require('./posts/routes/post.routes')(app);


// App is listening on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})