const HttpError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;

const Category = require('../models/category.db');

const checkIfParentCategoryExists = async (req, res, next) => {
  const parentId = req.params.id || null;

  if (parentId) {
    const parentCategoryExists =
      ObjectId.isValid(parentId) && (await Category.findById(parentId));

    if (!parentCategoryExists) {
      res.status(404).json({ message: "Category didn't found" });

      throw new HttpError[404]("Category didn't found");
    }
  }

  next();
};

module.exports = {
  checkIfParentCategoryExists
};
