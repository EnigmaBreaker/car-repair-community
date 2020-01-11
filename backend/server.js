const express = require('express');
const bodyParser = require('body-parser')
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({"message": "You are contacting car-group. "});
})

require('./users/routes/user.routes')(app);
// require('./posts/routes/post.routes')(app);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})