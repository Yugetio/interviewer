const HttpError = require('http-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/user.db');

const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    throw new HttpError[400]('Email already exists');
  }

  const user = await new User({
    email: req.body.email,
    password: hashPassword,
    fullname: req.body.fullname
  });

  await user.save();
  res.status(201).json({message: 'user was created'})
};

const login = (req, res) => {
  res.json({ msg: 'login' });
};

module.exports = {
  register,
  login
};
