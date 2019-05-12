const router = require("express").Router();
// Require our googleController, which returns our axios call
const googleController = require("../../controllers/googleController");

// Using router, on the "/" route, get the axios call, and find
// All of the results.
router
  .route("/")
  .get(googleController.findAll);

module.exports = router;
