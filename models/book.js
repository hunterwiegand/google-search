// Import mongoose to allow us to easily create mongoDb Schemas
const mongoose = require("mongoose");
// Create a Schema variable is set to the Schema method extended from mongoose.
const Schema = mongoose.Schema;

// Create a new schema with the following entries
const bookSchema = new Schema({
  // Title entry taht is a String, this is required when creating a book
  title: { type: String, required: true },
  // Subtitle entry taht is a String
  subtitle: { type: String },
  // Authors entry taht is a String, this is required when creating a book
  authors: { type: [String], required: true },
  // Link entry taht is a String, this is required when creating a book
  link: { type: String, required: true },
  // Description entry taht is a String, this is required when creating a book
  description: { type: String, required: true },
  // Image entry taht is a String, this is required when creating a book
  image: { type: String, required: true },
  // GoogleId entry taht is a String, That is also unique ccompared to other entires. This is required when creating a book
  googleId: { type: String, required: true, unique: true }
});

// Create a mongodb collection with the bookSchema, using mongoose
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
