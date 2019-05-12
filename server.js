// Dependancies 
const express = require("express");

// Require mongoose to allow us to easily write
// to our mongoDb database
const mongoose = require("mongoose");

// Require the api paths from out routes folder so that we
// can tell our app to navigate via our apps
const routes = require("./routes");

// Instantiate our application with express
// This allows us to use our routes to navigate
const app = express();

// Either a development port (like heroku) or a local port of 3001
const PORT = process.env.PORT || 3001;

// Middleware for formatting JSON like objects
// Takes in plain text from the http request and parses into a json like object.
// This parsing happens as the request happens, allowing us to have the req.body as a json like object
// without this we would just be recienving plain text.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If in a profuction envioprment, use the static
// Files found in client/build
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Use the routes we import from our routes folder to navigate our app
app.use(routes);

// Connect to a mongodb database utilizing mongoose
mongoose.connect(
  // connect via a mongoDb uri or a mongodb local host connection
  // This mongoDb uri would come from a hosting site like heroku, allowing us to
  // Link our database
  process.env.MONGODB_URI || "mongodb://localhost/googlebooks",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

//Start the app, listening on the PORT var we declared above
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);