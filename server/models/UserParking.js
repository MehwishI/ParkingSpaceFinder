const mongoose = require("mongoose");
const User = require("./User");

const UserParkingSchema = new mongoose.Schema({
  //parkid: { type: Number, required: true },

  locLatitude: { type: mongoose.Types.Decimal128, required: true },
  locLongitude: { type: mongoose.Types.Decimal128, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("UserParking", UserParkingSchema);
