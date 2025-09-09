const joi = require("joi");

const loginValidation = (user) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
  const schema = joi.object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Please enter a valid email address",
      }),
    password: joi.string().pattern(passwordRegex).required().messages({
      "string.pattern.base":
        "Password must be at least 9 characters with uppercase, lowercase, number, and special character (@$!%*?&)",
    }),
  });
  return schema.validate(user);
};
module.exports = loginValidation;
