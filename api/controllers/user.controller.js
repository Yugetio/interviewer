const bcrypt = require('bcryptjs');
const HttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user.db');

const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = await new User({
    email: req.body.email,
    password: hashPassword,
    fullname: req.body.fullname
  });

  await user.save();
  res.status(201).json({ message: 'user was created' });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new HttpError[400]('Email is not found'); //('Email or password is wrong')

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) throw new HttpError[400]('Invalid password');

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
};

module.exports = {
  register,
  login
};
