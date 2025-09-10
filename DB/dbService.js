const config = require("config");

const connectToDB = () => {
  const ENV = (config.get("NODE_ENV") || "development").trim();

  console.log(`Connecting to database in ${ENV} mode`);

  if (ENV === "development") {
    require("./mongoDB/connectLocally");
  } else if (ENV === "production") {
    require("./mongoDB/connectToAtlas");
  } else {
    console.log("Unknown environment, defaulting to development");
    require("./mongoDB/connectLocally");
  }
};

module.exports = connectToDB;
