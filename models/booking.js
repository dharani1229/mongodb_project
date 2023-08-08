const mongoose = require("mongoose");

const booking = new mongoose.Schema({
  productId: {
    type: String,
  },
  bookingDate: {
    type: String,
    default: Date.now,
  },
  quantitySold: {
    type: Number,
  },
});

module.exports = mongoose.model("booking", booking);