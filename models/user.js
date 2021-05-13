const mongoose = require("mongoose"),
  userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
  });

module.exports = mongoose.model("User", userSchema);
