const data = require("./initialData.json");
const normalizeUser = require("../users/helpers/normalizeUser");
const normalizeCard = require("../cards/helpers/normalizeCard");
const { register } = require("../users/models/usersDataAccessService");
const { generateUserPassword } = require("../users/helpers/bcrypt");
const chalk = require("chalk");
const { createCard } = require("../cards/models/cardsDataAccessService");

const generateInitialCards = async () => {
  const { cards } = data;
  for (const cardData of cards) {
    try {
      const userID = "6376274068d78742d84f31d2";
      const card = await normalizeCard(cardData, userID);
      await createCard(card);
    } catch (error) {
      console.log(chalk.redBright(error.message));
    }
  }
};

const generateInitialusers = async () => {
  const { users } = data;
  for (const userData of users) {
    try {
      const user = await normalizeUser(userData);
      user.password = generateUserPassword(user.password);
      await register(user);
    } catch (error) {
      console.log(chalk.redBright(error.message));
    }
  }
};

module.exports = { generateInitialCards, generateInitialusers };
