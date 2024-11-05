const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: false },
  userEmail: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, required: true },
  parkHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserParking",
      required: false,
    },
  ],
});
module.exports = mongoose.model("User", UserSchema);
