const bcrypt = require("bcryptjs");

const generateUserPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (originalPassword, hashedPassword) => {
  return bcrypt.compareSync(originalPassword, hashedPassword);
};

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;
