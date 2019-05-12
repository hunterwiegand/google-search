// Import axios so we can make calls to our api
import axios from "axios";

// Export these axios calls so we can use them in our app
export default {
  // axios call that allows us to use our api/books.js file and run a get command
  // To find books with the given title
  getBooks: function(q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  // Function that returns an axios call which calls our api/books and returns all books in our
  // database
  getSavedBooks: function() {
    return axios.get("/api/books");
  },
  // Function that returns an axios cals used to delete books from our database
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Function that returns an axios cals used to add books from our database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
