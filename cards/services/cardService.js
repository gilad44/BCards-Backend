const {
  find,
  findMyCards,
  findOne,
  createCard,
  updateCard,
  likeCard,
  removeCard,
} = require("../models/cardsDataAccessService");

const {
  validateCard,
  validateCardUpdate,
} = require("../validations/cardValidationService");
const normalizeCard = require("../helpers/normalizeCard");

exports.getCards = async () => {
  try {
    const cards = await find();
    return Promise.resolve(cards);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getMyCards = async (userID) => {
  try {
    const myCards = await findMyCards(userID);
    return Promise.resolve(myCards);
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.getOneCard = async (cardID) => {
  try {
    const card = await findOne(cardID);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.create = async (rawCard, userID) => {
  try {
    const { error } = validateCard(rawCard);
    if (error) {
      return Promise.reject(error);
    }
    let card = await normalizeCard(rawCard, userID);
    card = await createCard(card);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.update = async (cardId, rawCard) => {
  try {
    const { error } = validateCardUpdate(rawCard);
    if (error) {
      return Promise.reject(error);
    }
    const card = rawCard;
    const updatedCard = await updateCard(cardId, card);
    return Promise.resolve(updatedCard);
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.like = async (cardID, userID) => {
  try {
    const card = await likeCard(cardID, userID);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.remove = async (id) => {
  try {
    const card = await removeCard(id);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};
