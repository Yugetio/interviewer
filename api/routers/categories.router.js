const { Router } = require('express');
const controllers = require('../controllers/category.controller');
const middleware = require('../middleware');

const router = Router();

router.get('/all', controllers.getAllCategory);

router
  .route('/:id?')
  .post(
    middleware.checkParentCategoryIsExists,
    middleware.catchAsyncErrors(controllers.createCategory)
  )
  .get(
    middleware.checkParentCategoryIsExists,
    middleware.catchAsyncErrors(controllers.getCategoryById)
  );

module.exports = router;
