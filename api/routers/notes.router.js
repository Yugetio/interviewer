const router = require('express').Router();
const { body, param } = require('express-validator');
const controllers = require('../controllers/notes.controller');
const middleware = require('../middleware');

router.get('/all', controllers.getAllNotes);

router.post(
  '/:id?',
  middleware.validate([
    param('id', "Invalid id parameter").if(param('id').exists()).isMongoId(),
    body('question', 'Question is required')
      .not()
      .isEmpty()
  ]),
  middleware.checkParentCategoryIsExists,
  middleware.catchAsyncErrors(controllers.createNote)
);

router
  .route('/:id')
  .all(
    middleware.validate([param('id', 'Invalid id parameter').isMongoId()]),
    middleware.checkNotesIsExists
  )
  .get(middleware.catchAsyncErrors(controllers.getNoteById))
  .put(
    middleware.validate([
      body('question', 'Question is required')
        .not()
        .isEmpty(),
      body('answer', 'Answer is required')
        .not()
        .isEmpty()
    ]),
    middleware.catchAsyncErrors(controllers.editNote)
  )
  .delete(middleware.catchAsyncErrors(controllers.deleteNoteById));

module.exports = router;
