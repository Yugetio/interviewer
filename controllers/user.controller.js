const bcrypt = require('bcryptjs');
const HttpError = require('http-errors');
// const jwt = require('jsonwebtoken');
const User = require('../models/user.db');

const register = async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) {
    throw new HttpError[400]('Email already exists');
  }

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

  req.session.user = {
    id: user._id,
    email: user.email,
    fullname: user.fullname,
    privilege: user.privilege
  };
  req.session.isAuthenticated = true;
  req.session.save(err => {
    if (err) {
      throw err;
    }
    res.json({ message: 'success' });
  });
};

const logout = async (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'success' });
  });
};

module.exports = {
  register,
  login,
  logout
};
