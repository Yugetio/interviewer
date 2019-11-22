const { Router } = require('express');
const controllers = require('../controllers/notes.controller');
const middleware = require('../middleware/errorHandlers');

const router = Router();

router.get('/all', controllers.getAllNotes);

router
  .route('/:id?')
  .post(middleware.checkIfParentCategoryExists, controllers.createNote)
  .get(isValidIdFromParams, controllers.getNoteById)
  .put(isValidIdFromParams, controllers.editNote)
  .delete(isValidIdFromParams, controllers.deleteNoteById);

module.exports = router;
