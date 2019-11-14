const Category = require('../models/category.db');

const createCategory = async (req, res) => {
  const category = new Category({
    title: req.body.title
  });

  await category.save();

  res.status(201).json(category);
};

const getAllCategory = async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
};

module.exports = {
  createCategory,
  getAllCategory
};