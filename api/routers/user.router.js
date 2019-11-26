const router = require('express').Router();
const { body } = require('express-validator');
const controllers = require('../controllers/user.controller');
const middleware = require('../middleware');

router.route('/register').post(
  middleware.validate([
    body('email')
      .isEmail()
      .normalizeEmail(),
    body('password')
      .trim()
      .matches(/^\S*$/g)
      .withMessage('field should not include spaces')
      .isLength({ min: 6, max: 1024 })
      .withMessage('must be at least 6 chars long'),
    body('fullname')
      .trim()
      .isLength({ min: 5, max: 255 })
      .withMessage('must be at least 5 chars long')
  ]),
  middleware.catchAsyncErrors(controllers.register)
);

router.route('/login').post(
  middleware.validate([
    body('email')
      .isEmail()
      .normalizeEmail(),
    body('password')
      .trim()
      .matches(/^\S*$/g)
      .withMessage('field should not include spaces')
      .isLength({ min: 6, max: 1024 })
      .withMessage('must be at least 6 chars long')
  ]),
  middleware.catchAsyncErrors(controllers.login)
);

module.exports = router;
