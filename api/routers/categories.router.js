const { Router } = require('express');
const controllers = require('../controllers/category.controller');
const middleware = require('../middleware/errorHandlers');

const router = Router();

router.get('/all', controllers.getAllCategory);

router
  .route('/:id?')
  .post(
    middleware.checkParentCategoryIsExists,
    controllers.createCategory)
  .get(
    middleware.checkParentCategoryIsExists,
    controllers.getCategoryById);

module.exports = router;
