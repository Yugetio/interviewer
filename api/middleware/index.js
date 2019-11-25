const errorHandlers = require('./errorHandlers');
const validation = require('./validation');

module.exports = {
  ...errorHandlers,
  ...validation
};
