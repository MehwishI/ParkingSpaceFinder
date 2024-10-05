const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userid: { type: Number, required: true },
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: false },
  userEmail: { type: String, required: true },
});
module.exports = mongoose.model("User", UserSchema);
