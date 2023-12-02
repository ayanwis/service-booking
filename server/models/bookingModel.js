const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
