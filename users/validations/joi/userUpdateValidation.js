const joi = require("joi");

const validateUserUpdate = (user) => {
  const schema = joi
    .object({
      name: joi.object({
        first: joi.string().min(2).max(50),
        last: joi.string().min(2).max(50),
      }),
      email: joi.string().email(),
      phone: joi.string().pattern(/^[0-9\-+\s()]{10,15}$/),
      address: joi.object({
        state: joi.string().min(2).max(50).allow(""),
        city: joi.string().min(2).max(50),
        street: joi.string().min(2).max(100),
        houseNumber: joi
          .alternatives()
          .try(joi.number(), joi.string().pattern(/^\d+$/)),
        zip: joi
          .alternatives()
          .try(joi.number(), joi.string().pattern(/^\d+$/)),
        country: joi.string().min(2).max(50),
      }),
      image: joi.object({
        url: joi.string().uri().allow(""),
        alt: joi.string().min(2).max(100).allow(""),
      }),
      isBusiness: joi.boolean(),
      isAdmin: joi.boolean(),
    })
    .min(1); // At least one field must be provided for update
  return schema.validate(user);
};

module.exports = validateUserUpdate;
