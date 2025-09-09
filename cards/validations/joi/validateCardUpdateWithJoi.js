const Joi = require("joi");

const phoneRegEx = /^(?:\+972[- ]?|0)([23489]|5[0-9])[- ]?\d{3}[- ]?\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const webRegEx =
  /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
const imageRegEx =
  /^(https?:\/\/[\w\-\.\/\d_]+)\.(jpg|jpeg|png|gif|svg|webp)$/i;

const cardUpdateSchema = Joi.object({
  title: Joi.string().min(2),
  subtitle: Joi.string().min(2),
  description: Joi.string().min(2),
  phone: Joi.string().pattern(phoneRegEx),
  email: Joi.string().pattern(emailRegex),
  web: Joi.string().pattern(webRegEx),
  image: Joi.object({
    url: Joi.string().pattern(imageRegEx).allow(""),
    alt: Joi.string().allow(""),
  }),
  address: Joi.object({
    state: Joi.string().min(2).allow(""),
    country: Joi.string().min(2),
    city: Joi.string().min(2),
    street: Joi.string().min(2),
    houseNumber: Joi.number(),
    zip: Joi.number(),
  }),
  bizNumber: Joi.string().pattern(/^\d{9}$/),
  likes: Joi.array().items(Joi.string()),
}).min(1); // At least one field must be provided

module.exports = (card) => cardUpdateSchema.validate(card);
