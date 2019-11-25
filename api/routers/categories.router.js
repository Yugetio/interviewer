const router = require('express').Router();
const { param } = require('express-validator');
const controllers = require('../controllers/category.controller');
const middleware = require('../middleware');

router.get('/all', controllers.getAllCategory);

router
  .route('/:id?')
  .all(
    middleware.validate([
      param('id', 'Invalid id parameter')
        .if(param('id').exists())
        .isMongoId()
    ]),
    middleware.checkParentCategoryIsExists
  )
  .post(middleware.catchAsyncErrors(controllers.createCategory))
  .get(middleware.catchAsyncErrors(controllers.getCategoryById));

module.exports = router;
