const path = require("path");

const router = require("express").Router();
// Require routes from other .js files
const bookRoutes = require("./books");
const googleRoutes = require("./google");

// tell the router to use the bookRoutes and googleRoutes
// as routes to use in the app
router.use("/books", bookRoutes);
router.use("/google", googleRoutes);

//Export router with new uses
module.exports = router;
