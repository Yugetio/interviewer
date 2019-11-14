const HttpError = require("http-errors");
const Category = require("../models/category.db");
const Note = require("../models/note.db");

const createNote = async (req, res) => {
  const category = await Category.findById(req.body.categoryId);

  if (!category) {
    res.status(404).json({ message: "Category didn't found" });

    throw new HttpError[404]("Category didn't found");
  }

  const note = new Note({
    question: req.body.question,
    answer: req.body.answer,
    categoryId: req.body.categoryId
  });

  category.notes.push(note);

  await note.save();
  await category.save();

  res.status(201).json(note);
};

const getAllNotes = async (req, res) => {
  const notes = await Note.find();

  res.status(200).json(notes);
};

const getAllNotesByCategoryId = async (req, res) => {
  const category = await Category.findById(req.params.id).populate("notes");

  res.json(category.notes);
};

const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);

  res.json(note);
};

const editNote = async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndUpdate(id, req.body);

  res.status(202).json({ id, message: "updated" });
};

const deleteNoteById = async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id);
  const category = await Category.findById(note.categoryId);

  if (!note) {
    res.status(404).json({ message: "Note didn't found" });

    throw new HttpError[404]("Note didn't found");
  }

  if (!category) {
    res.status(404).json({ message: "Category didn't found" });

    throw new HttpError[404]("Category didn't found");
  }

  await Note.findByIdAndDelete(id);

  category.notes.pull(id);
  await category.save();

  res.status(202).json({ id, message: "deleted" });
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  getAllNotesByCategoryId,
  editNote,
  deleteNoteById
};
