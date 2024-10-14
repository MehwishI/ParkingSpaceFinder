const mongoose = require("mongoose");
const User = require("./User");

const UserParkingSchema = new mongoose.Schema({
  //parkid: { type: Number, required: true },

  paystation_number: { type: String, required: true },
  restriction: { type: String, required: true },
  time_limit: { type: String, required: true },
  street: { type: String, required: true },
  total_space: { type: String, required: true },
  accessible_space: { type: String, required: true },
  hourly_rate: { type: String, required: true },
  mobile_pay_zone: { type: String, required: true },
  locLatitude: { type: mongoose.Types.Decimal128, required: true },
  locLongitude: { type: mongoose.Types.Decimal128, required: true },
  city: { type: String, default: "Winnipeg" },
  parking_date: { type: Date, default: Date.now },

  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("UserParking", UserParkingSchema);
