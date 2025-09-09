const express = require("express");
const app = express();
const router = require("./router/router");
const cors = require("./middleware/cors");
const { handleError } = require("./utils/errorHandler");
const logger = require("./logger/loggerService");
const connectToDB = require("./DB/dbService");
const config = require("config");
const {
  generateInitialCards,
  generateInitialusers,
} = require("./initialData/initialDataService");

// Middleware - App level
app.use(cors);
app.use(logger);
app.use(express.json());
app.use(router);

// Error handler middleware
app.use((err, req, res, next) => {
  handleError(res, err.status || 500, err.message);
});

const PORT = config.get("PORT");
app.listen(PORT, async () => {
  console.log("Server Running");
  connectToDB();
  await generateInitialusers();
  await generateInitialCards();
});
