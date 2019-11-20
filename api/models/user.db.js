const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  privilege: {
    type: String,
    default: "user"
  }
});

module.exports = model("User", userSchema);
