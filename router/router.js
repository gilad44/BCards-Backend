const express = require("express");
const router = express.Router();
const handleError = require("../utils/errorHandler");

// controllers import
const cardsController = require("../cards/routes/cardController");
const usersController = require("../users/routes/usersController");

// routing to the controllers
router.use("/cards", cardsController);
router.use("/users", usersController);

// router error handeling
router.use((req, res) => handleEror(res, 404, "Route not found"));

module.exports = router;
