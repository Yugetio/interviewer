const User = require('../models/user.db');

const register = (req, res) => {
  
};

const login = (req, res) => {
  res.json({msg: 'login'})
};

module.exports = {
  register,
  login
};