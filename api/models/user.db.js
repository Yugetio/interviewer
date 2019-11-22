const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  fullname: {
    type: String,
    trim: true,
    required: true
  },
  privilege: {
    type: String,
    default: 'user'
  }
});

module.exports = model('User', userSchema);
