const { Router } = require("express");
const controllers = require('../controllers/category.controller');

const router = Router();

router.post('/', controllers.createCategory);

router.get('/all', controllers.getAllCategory);

module.exports = router;