const joi = require("joi");

const validateId = (id) => {
  const schema = joi.object({
    id: joi.string().hex().length(24).required().messages({
      "string.hex": "ID must be a valid hexadecimal string",
      "string.length": "ID must be exactly 24 characters long",
      "string.empty": "ID is required",
    }),
  });
  return schema.validate({ id });
};

module.exports = validateId;
