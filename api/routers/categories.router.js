const { Router } = require('express');
const controllers = require('../controllers/category.controller');
const middleware = require('../middleware/errorHandlers');

const router = Router();

router.get('/all', controllers.getAllCategory);

router
  .route('/:id?')
  .post(
    middleware.checkIfParentCategoryExists,
    controllers.createCategory)
  .get(
    middleware.checkIfParentCategoryExists,
    controllers.getCategoryById);

module.exports = router;
