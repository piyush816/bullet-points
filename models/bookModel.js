const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 10,
      max: 100,
      required: true,
    },
    author: {
      type: String,
      min: 10,
      max: 100,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    bulletPoints: [String],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("book", bookSchema);
