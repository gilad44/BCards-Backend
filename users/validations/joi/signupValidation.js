const joi = require("joi");

const signupValidation = (user) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const schema = joi.object({
    name: joi
      .object({
        first: joi.string().min(2).max(50).required(),
        last: joi.string().min(2).max(50).required(),
      })
      .required(),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Please enter a valid email address",
      }),
    password: joi.string().pattern(passwordRegex).required().messages({
      "string.pattern.base":
        "Password must be at least 6 characters with uppercase, lowercase, number, and special character (@$!%*?&)",
    }),
    confirmPassword: joi
      .string()
      .valid(joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
      }),
    phone: joi
      .string()
      .pattern(/^[0-9\-+\s()]{10,15}$/)
      .required(),
    address: joi
      .object({
        state: joi.string().min(2).max(50).allow(""),
        country: joi.string().min(2).max(50).required(),
        city: joi.string().min(2).max(50).required(),
        street: joi.string().min(2).max(100).required(),
        houseNumber: joi
          .alternatives()
          .try(joi.number(), joi.string().pattern(/^\d+$/))
          .required(),
        zip: joi
          .alternatives()
          .try(joi.number(), joi.string().pattern(/^\d+$/)),
      })
      .required(),
    image: joi.object({
      url: joi.string().uri().allow(""),
      alt: joi.string().allow(""),
    }),
    isBusiness: joi.boolean().default(false),
    isAdmin: joi.boolean().default(false),
  });
  return schema.validate(user);
};
module.exports = signupValidation;
