// Requirer express.router so we can add our routes
const router = require("express").Router();
// Requirer our bookController so we can use our database crud commands
const bookController = require("../../controllers/bookController");

// Fired on the "/" route
router.route("/")
  // git command to retrieve all books from our database
  .get(bookController.findAll)
  // Post command to create a book to our database
  .post(bookController.create);

  // Fires when an ID is added to the "/" route
router
  .route("/:id")
  // Get command to search for a book with the id given from the
  // route extension
  .get(bookController.findById)
  // Put command to update the entry with the id given from the
  // route extension
  .put(bookController.update)
  // Delete command to delete entry with the id given from the 
  // route extension
  .delete(bookController.remove);

module.exports = router;
