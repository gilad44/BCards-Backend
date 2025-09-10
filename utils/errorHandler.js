const chalk = require("chalk");
const handleError = (res, status, message = "") => {
  console.error(chalk.redBright(message));
  res.locals.errorMessage = message;
  res.status(status).send(message);
};

const handleBadRequest = (validator, error) => {
  const errorMessage = `${validator} Error: ${error}`;
  const message = new Error(errorMessage);
  message.status = error.status;
  return Promise.reject(message);
};

const handleJoiError = (err) => {
  const joiError = new Error(err.details[0].message);
  return handleBadRequest("joi", joiError);
};
module.exports = { handleError, handleBadRequest, handleJoiError };
