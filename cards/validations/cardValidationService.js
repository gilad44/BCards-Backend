const validateCardWithJoi = require("./joi/validateCardWithJoi");
const validateCardUpdateWithJoi = require("./joi/validateCardUpdateWithJoi");

const validator = undefined || "joi";

const validateCard = (card) => {
  if (validator === "joi") {
    return validateCardWithJoi(card);
  }
};

const validateCardUpdate = (card) => {
  if (validator === "joi") {
    return validateCardUpdateWithJoi(card);
  }
};

module.exports = { validateCard, validateCardUpdate };
