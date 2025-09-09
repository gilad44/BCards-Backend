const lodash = require("lodash");
const User = require("./mongoDB/User");
const { handleBadRequest } = require("../../utils/errorHandler");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const config = require("config");
const db = config.get("DB") || "MONGODB";

exports.register = async (normalizedUser) => {
  if (db === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) {
        throw new Error("User already registered");
      }
      user = new User(normalizedUser);
      user = await user.save();
      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("User created not in mongodb");
};
exports.login = async (normalizedUser) => {
  if (db === "MONGODB") {
    try {
      const { email, password } = normalizedUser;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("User created not in mongodb");
};

exports.find = async () => {
  if (db === "MONGODB") {
    try {
      const users = await User.find().select("-password -__v");
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve([]);
};
exports.findOne = async (userID) => {
  if (db === "MONGODB") {
    try {
      const user = await User.findById(userID).select("-password -__v");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve([]);
};
exports.update = async (userID, normalizedUser) => {
  if (db === "MONGODB") {
    try {
      const user = await User.findByIdAndUpdate(userID, normalizedUser, {
        new: true,
      }).select("-password -__v");
      if (!user) {
        throw new Error("Can't update user as it's not found in mongodb");
      } else {
        return Promise.resolve(user);
      }
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("User not in db");
};
exports.changeIsBizStatus = async (userID) => {
  if (db === "MONGODB") {
    try {
      const pipeline = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
      const user = await User.findByIdAndUpdate(userID, pipeline, {
        new: true,
      }).select("-password -__v");
      if (!user) {
        throw new Error(
          "Couldn't update isBusiness user status as useer is not in the db"
        );
      } else {
        return Promise.resolve(user);
      }
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("User updated");
};
exports.remove = async (userID) => {
  if (db === "MONGODB") {
    try {
      const user = await User.findByIdAndDelete(userID).select(
        "-password -__v"
      );
      if (!user) {
        throw new Error("Couldn't delete user as it's not in the db");
      } else {
        return Promise.resolve(user);
      }
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("User not in db");
};
