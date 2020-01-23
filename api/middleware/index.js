const errorHandlers = require('./errorHandlers');
const validation = require('./validation');
const isExists = require('./isExists');
const auth = require('./auth');

module.exports = {
  ...errorHandlers,
  ...validation,
  ...isExists,
  auth
};
