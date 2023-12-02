const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service should has a name"],
  },
  description: {
    type: String,
    required: [true, "Service should has a description"],
  },
  price: {
    type: Number,
    required: [true, "Service should has a price"],
  },
});

module.exports = mongoose.model("Service", serviceSchema);
