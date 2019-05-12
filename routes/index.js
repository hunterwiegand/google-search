const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// Tell our express router to use the apiRoutes from the aou folder
router.use("/api", apiRoutes);

// Direct to the index.html page on load
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = router;
