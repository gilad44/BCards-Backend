const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    match: /^https?:\/\/.*\.(jpg|jpeg|png|gif|svg|webp)$/i, // Allow valid image URLs
  },
  alt: {
    type: String,
    min: 2,
  },
});
module.exports = imageSchema;
