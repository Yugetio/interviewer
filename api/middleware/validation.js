const { validationResult, params } = require('express-validator');
const HttpError = require('http-errors');

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const validateError = new HttpError[422]('Validation failed');
    validateError.data = errors.array();
    next(validateError);
  };
};

module.exports = {
  validate
};
