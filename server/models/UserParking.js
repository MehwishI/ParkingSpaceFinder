const mongoose = require("mongoose");

const UserParkingSchema = new mongoose.Schema({
  userid: { type: Number, required: true },
  locLatitude: { type: mongoose.Types.Decimal128, required: true },
  locLongitude: { type: mongoose.Types.Decimal128, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("UserParking", UserParkingSchema);
