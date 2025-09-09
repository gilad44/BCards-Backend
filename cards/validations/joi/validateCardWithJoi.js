const Joi = require("joi");

const phoneRegEx = /^(?:\+972[- ]?|0)([23489]|5[0-9])[- ]?\d{3}[- ]?\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const webRegEx =
  /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
const imageRegEx =
  /^(https?:\/\/[\w\-\.\/\d_]+)\.(jpg|jpeg|png|gif|svg|webp)$/i;

const cardSchema = Joi.object({
  title: Joi.string().min(2).required(),
  subtitle: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  phone: Joi.string().pattern(phoneRegEx).required(),
  email: Joi.string().pattern(emailRegex).required(),
  web: Joi.string().pattern(webRegEx).required(),
  image: Joi.object({
    url: Joi.string().pattern(imageRegEx),
    alt: Joi.string().min(2).required(),
  }),
  address: Joi.object({
    state: Joi.string().min(2).allow(""),
    country: Joi.string().min(2).required(),
    city: Joi.string().min(2).required(),
    street: Joi.string().min(2).required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number().required(),
  }).required(),
  bizNumber: Joi.string().pattern(/^\d{9}$/),
  createdAt: Joi.date().default(Date.now),
  user_id: Joi.string(),
  likes: Joi.array().items(Joi.string()),
});

module.exports = (card) => cardSchema.validate(card);
