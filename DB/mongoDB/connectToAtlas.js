const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");
const dbName = config.get("DB_NAME");
mongoose
  .connect(dbName)
  .then(() => console.log(chalk.greenBright("Connected cloudly to mongoDB")))
  .catch((err) => {
    console.log(chalk.redBright(err));
  });
