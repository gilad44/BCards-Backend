const express = require("express");
const { handleError } = require("../../utils/errorHandler");
const auth = require("../../auth/authService");

const { getCards } = require("../services/cardService");
const { getMyCards } = require("../services/cardService");
const { getOneCard } = require("../services/cardService");
const { create } = require("../services/cardService");
const { update } = require("../services/cardService");
const { like } = require("../services/cardService");
const { remove } = require("../services/cardService");
const router = express.Router();

// the paths in each route.something is what comes after "/cards" or "/users"
// etc
router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});
router.get("/my-cards", auth, async (req, res) => {
  try {
    const userID = req.user._id;
    const myCards = await getMyCards(userID);
    return res.send(myCards);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const card = await getOneCard(id);
    return res.send(card);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});
router.post("/", auth, async (req, res) => {
  try {
    if (!req.user.isBusiness) {
      return res.status(403).send("Only business users can create cards");
    }
    const userID = req.user._id;
    const card = await create(req.body, userID);
    return res.send(card);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});
router.put("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    let card = await getOneCard(id);
    if (!card.user_id.equals(req.user._id)) {
      return res
        .status(403)
        .send("Only the user who created this card can edit it");
    }
    card = await update(id, req.body);
    return res.send(card);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});
router.patch("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const userID = req.user._id;
    const card = await like(id, userID);
    return res.send(card);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const card = await remove(id);
    return res.send(card);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});

module.exports = router;
