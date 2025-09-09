const mongoose = require("mongoose");
const Address = require("./Address");
const Image = require("./Image");
const UserSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      minLength: 2,
      maxLength: 50,
      required: true,
    },
    last: {
      type: String,
      minLength: 2,
      maxLength: 50,
      required: true,
    },
  },
  phone: {
    type: String,
    match: RegExp(/^[0-9\-+\s()]{10,15}$/),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  },
  password: {
    type: String,
    required: true,
    // Removed regex validation to allow hashed passwords
  },
  image: Image,
  address: Address,
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
