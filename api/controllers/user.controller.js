const bcrypt = require('bcryptjs');
const HttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user.db');
const generateToken = require('../helpers/generateToken');

const tokenList = {};

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
  if (!user) throw new HttpError[401]('Email is not found'); //('Email or password is wrong')

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) throw new HttpError[401]('Invalid password');

  const { token, refreshToken } = generateToken(user);

  tokenList[refreshToken] = token;

  res.json({
    message: 'Logged in',
    token,
    refreshToken,
    tokenList
  });
};

const token = async (req, res) => {
  const postData = req.body;

  if (postData.refreshToken && postData.refreshToken in tokenList) {
    try {
      const verified = jwt.verify(
        postData.refreshToken,
        process.env.TOKEN_REFRESH_SECRET
      );
      const { token, refreshToken } = generateToken(verified);

      delete tokenList[postData.refreshToken];
      tokenList[refreshToken] = token;

      res.json({
        message: 'success request',
        token,
        refreshToken,
        tokenList
      });
    } catch (e) {
      res.status(403).send('Invalid token');
    }
  } else {
    res.status(403).send('Invalid request');
  }
};

module.exports = {
  register,
  login,
  token
};
