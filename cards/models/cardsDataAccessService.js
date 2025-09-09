const Card = require("./mongoDB/Card");
const { handleBadRequest } = require("../../utils/errorHandler");
const config = require("config");
const db = config.get("DB");

exports.find = async () => {
  if (db === "MONGODB") {
    try {
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve([]);
};
exports.findMyCards = async (userID) => {
  if (db === "MONGODB") {
    try {
      const myCards = await Card.find({ user_id: userID });
      return Promise.resolve(myCards);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve([]);
};
exports.findOne = async (cardID) => {
  if (db === "MONGODB") {
    try {
      const card = await Card.findById(cardID);
      if (!card) {
        throw new Error("Couldn't find card in db");
      } else {
        return Promise.resolve(card);
      }
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve();
};
exports.createCard = async (normalizedCard) => {
  if (db === "MONGODB") {
    try {
      const email = normalizedCard.email;
      let card = await Card.findOne({ email });
      if (card) {
        throw new Error("Card already exists");
      }
      card = new Card(normalizedCard);
      card = await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
};
exports.updateCard = async (cardID, normalizedCard) => {
  if (db === "MONGODB") {
    try {
      const card = await Card.findByIdAndUpdate(cardID, normalizedCard, {
        new: true,
      });
      if (!card) {
        throw new Error("Couldn't find card in db");
      } else {
        return Promise.resolve(card);
      }
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({});
};
exports.likeCard = async (cardID, userID) => {
  if (db === "MONGODB") {
    try {
      const card = await Card.findById(cardID);
      if (!card) {
        throw new Error("Couldn't find card in db");
      } else {
        if (card.likes.includes(userID)) {
          card.likes = card.likes.filter((id) => id !== userID);
          await card.save();
          return Promise.resolve(`Card no. ${card._id} unliked`);
        } else {
          card.likes.push(userID);
          await card.save();
          return Promise.resolve(`Card no.  ${card._id} liked`);
        }
      }
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({});
};

exports.removeCard = async (cardID) => {
  if (db === "MONGODB") {
    try {
      const card = await Card.findByIdAndDelete(cardID);
      if (!card) {
        throw new Error("Couldn't find card in db");
      } else return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("Card not found in mongoDB");
};
