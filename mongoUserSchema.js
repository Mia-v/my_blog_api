const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  userId: Number,
  userType: Number,
});

const User = mongoose.model('user', userSchema);

module.exports = User;