const { Router } = require('express');
const controllers = require('../controllers/notes.controller');
const middleware = require('../middleware');

const router = Router();

router.get('/all', controllers.getAllNotes);

router
  .route('/:id?')
  .post(
    middleware.checkParentCategoryIsExists,
    middleware.catchAsyncErrors(controllers.createNote)
  )
  .get(
    middleware.isValidIdFromParams,
    middleware.checkNotesIsExists,
    middleware.catchAsyncErrors(controllers.getNoteById)
  )
  .put(
    middleware.isValidIdFromParams,
    middleware.checkNotesIsExists,
    middleware.catchAsyncErrors(controllers.editNote)
  )
  .delete(
    middleware.isValidIdFromParams,
    middleware.checkNotesIsExists,
    middleware.catchAsyncErrors(controllers.deleteNoteById)
  );

module.exports = router;
