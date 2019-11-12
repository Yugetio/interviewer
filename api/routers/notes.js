const {Router} = require('express');
const Note = require('../models/note');

const router = Router();

router.get('/', async (req, res) => {
  const notes = await Note.find();

  res.status(200).json(notes)
});

router.post('/', async (req, res) => {
  const note = new Note({
    question: req.body.question,
    answer: req.body.answer
  });

  try {
    await note.save();
    res.status(201).json(note);
  } catch (e) {
    console.log(e);
  }
})

module.exports = router;