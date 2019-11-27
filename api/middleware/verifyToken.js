const jwt = require('jsonwebtoken');
const HttpError = require('http-errors');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) next(new HttpError[401]('Access denied'));

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified.id;
    next();
  } catch (e) {
    next(new HttpError[400]('Invalid Token'));
  }
};
