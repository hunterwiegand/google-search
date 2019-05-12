// Import axios so we can make api calls on the back end
const axios = require("axios");
// Import all models from the model directory
const db = require("../models");

// Export the axios calls
module.exports = {
  findAll: function(req, res) {
    // Object deconstruction
    const { query: params } = req;
    // params => { q: <book to search for> }
    // https://www.googleapis.com/books/v1/volumes?q=war%of%the%world
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params
      })
      .then(results =>
        // Filter through the results the we get back from the axios call
        // and return only the information listed below
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
      )
      // Tag on a promise to deal with the new data we just formed.
      .then(apiBooks =>
        // Mongoose CRUD operation to find all entries in the Book collection
        // tag a promise and pass in the data from the mongoose call and store it
        // in dbBooks.
        db.Book.find().then(dbBooks =>
          // Filter through the apiBooks
          apiBooks.filter(apiBook =>
            // For each entry in dbBooks, check to see if the apiBook.id matches the dbBook.googleId
            // retrun false if there is a match
            dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
          )
        )
      )
      // books will be an array of book objects that we do not have saved
      // in our Book collection.
      .then(books => res.json(books))
      // If there is an error while handling the request, return the error in json format
      .catch(err => res.status(422).json(err));
  }
};
