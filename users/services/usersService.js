const { register } = require("../models/usersDataAccessService");
const { login } = require("../models/usersDataAccessService");
const { findOne } = require("../models/usersDataAccessService");
const { find } = require("../models/usersDataAccessService");
const { update } = require("../models/usersDataAccessService");
const { changeIsBizStatus } = require("../models/usersDataAccessService");
const { remove } = require("../models/usersDataAccessService");
const { validateSignup } = require("../validations/userValidationService");
const { validateLogin } = require("../validations/userValidationService");
const { validateUserUpdate } = require("../validations/userValidationService");
const { generateUserPassword } = require("../helpers/bcrypt");
const normalizeUser = require("../helpers/normalizeUser");

exports.registerUser = async (rawUser) => {
  try {
    const { error } = validateSignup(rawUser);
    if (error) {
      return Promise.reject(error);
    }
    let user = normalizeUser(rawUser);
    user.password = generateUserPassword(user.password);
    user = await register(user);
    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
};
exports.loginUser = async (rawUser) => {
  try {
    const { error } = validateLogin(rawUser);
    if (error) {
      return Promise.reject(error);
    }
    const user = await login(rawUser);
    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
};
exports.getUsers = async () => {
  try {
    const users = await find();
    return Promise.resolve(users);
  } catch (err) {
    return Promise.reject(err);
  }
};
exports.getUser = async (userID) => {
  try {
    const user = await findOne(userID);
    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
};
exports.updateUser = async (userID, rawUser) => {
  try {
    const { error } = validateUserUpdate(rawUser);
    if (error) {
      return Promise.reject(error);
    }
    let user = { ...rawUser };
    user = await update(userID, user);
    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
};
exports.changeUserBizStatus = async (userID) => {
  try {
    const user = await changeIsBizStatus(userID);
    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
};
exports.deleteUser = async (userID) => {
  try {
    const user = await remove(userID);
    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
};
