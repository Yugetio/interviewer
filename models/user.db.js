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
    required: true,
    max: 1024,
    min: 6
  },
  fullname: {
    type: String,
    trim: true,
    required: true,
    min: 5,
    max: 255
  },
  privilege: {
    type: String,
    default: 'user'
  }
});

module.exports = model('User', userSchema);
