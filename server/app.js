const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;




//middleware
app.use(cors());
// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB using Mongoose
//connecting db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen port requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(bodyParser.json());
app.use('/api', todoRoutes); // All routes for todos are under '/api'

