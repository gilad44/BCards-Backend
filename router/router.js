const express = require("express");
const router = express.Router();
const handleError = require("../utils/errorHandler");

// importing the controllers, which are the department navigators
const cardsController = require("../cards/routes/cardController");
const usersController = require("../users/routes/usersController");

// routing to the controllers
router.use("/cards", cardsController);
router.use("/users", usersController);

router.use((req, res) => handleError(res, 404, "Route not found"));

module.exports = router;
