const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  state: { type: String, min: 2 },
  country: { type: String, min: 2, required: true },
  city: { type: String, min: 2, required: true },
  street: { type: String, min: 2, required: true },
  houseNumber: { type: Number, required: true },
  zip: { type: Number, required: true },
});
module.exports = AddressSchema;
