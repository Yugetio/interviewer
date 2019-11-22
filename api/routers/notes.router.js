const { Router } = require('express');
const controllers = require('../controllers/notes.controller');
const middleware = require('../middleware');

const router = Router();

router.get('/all', controllers.getAllNotes);

router.post(
  '/:id?',
  middleware.checkParentCategoryIsExists,
  middleware.catchAsyncErrors(controllers.createNote)
);

router
  .route('/:id')
  .all(middleware.isValidIdFromParams, middleware.checkNotesIsExists)
  .get(middleware.catchAsyncErrors(controllers.getNoteById))
  .put(middleware.catchAsyncErrors(controllers.editNote))
  .delete(middleware.catchAsyncErrors(controllers.deleteNoteById));

module.exports = router;
