const Category = require('../models/category.db');
const Notes = require('../models/note.db');

const createCategory = async (req, res) => {
  const parentId = req.params.id || null;

  const category = new Category({
    title: req.body.title,
    parentId
  });

  await category.save();

  res.status(201).json(category);
};

const getAllCategory = async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
};

const getCategoryById = async (req, res) => {
  const parentId = req.params.id || null;

  const categories = await Category.find({ parentId }) || [];
  const notes = await Notes.find({ parentId }) || [];

  res.json({ categories, notes });
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById
};
