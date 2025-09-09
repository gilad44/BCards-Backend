const mongoose = require("mongoose");
const phoneRegEx = /^(?:\+972[- ]?|0)([23489]|5[0-9])[- ]?\d{3}[- ]?\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const webRegEx =
  /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
const Address = require("./Address");
const Image = require("./Image");

const cardSchema = new mongoose.Schema({
  title: { type: String, min: 2, required: true },
  subtitle: { type: String, min: 2, required: true },
  description: { type: String, min: 2, required: true },
  phone: { type: String, match: RegExp(phoneRegEx), required: true },
  email: { type: String, match: RegExp(emailRegex), required: true },
  web: { type: String, match: RegExp(webRegEx), required: true },
  image: Image,
  address: Address,
  bizNumber: { type: Number },
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  likes: { type: [String] },
});
const Card = mongoose.model("card", cardSchema);
module.exports = Card;
