const Note = require('../models/note.db');

const createNote = async (req, res) => {
  const parentId = req.params.id || null;

  const note = new Note({
    question: req.body.question,
    answer: req.body.answer,
    parentId,
    authorId: '5dd6df247e10f300de647ecc'
  });

  await note.save();

  res.status(201).json(note);
};

//must be get all user's notes  (to rewrite)
const getAllNotes = async (req, res) => {
  const notes = await Note.find();

  res.status(200).json(notes);
};

const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);

  res.json(note);
};

const editNote = async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndUpdate(id, req.body);

  res.status(202).json({ id, message: 'updated' });
};

const deleteNoteById = async (req, res) => {
  // const { id } = req.params;

  // const note = await Note.findById(id);

  // if (!note) {
  //   res.status(404).json({ message: "Note didn't found" });

  //   throw new HttpError[404]("Note didn't found");
  // }

  // await Note.findByIdAndDelete(id);

  // res.status(202).json({ id, message: "deleted" });
  res.json({ message: 'to rewrite method' });
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  editNote,
  deleteNoteById
};
