const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect("mongodb://localhost:27017/BCards")
  .then(() => console.log(chalk.greenBright("Connected locally to mongoDB")))
  .catch((err) => {
    console.log(chalk.redBright(err));
  });
