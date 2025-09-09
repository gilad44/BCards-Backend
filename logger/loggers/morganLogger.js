const morgan = require("morgan");
const chalk = require("chalk");
const { writeErrorLog } = require("./errorFileLogger");

const morganLogger = morgan((tokens, req, res) => {
  const status = Number(tokens.status(req, res));
  const logMessage = [
    tokens.date(req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    status,
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  // Write to file if status code is 400 or higher
  if (status >= 400) {
    const errorMessage = res.locals.errorMessage || `HTTP ${status} Error`;
    writeErrorLog(req, res, status, errorMessage);
  }

  return (status >= 400 ? chalk.redBright : chalk.cyanBright)(logMessage);
});

module.exports = morganLogger;
