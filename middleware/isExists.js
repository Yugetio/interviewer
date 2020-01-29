const HttpError = require('http-errors');

const Category = require('../models/category.db');
const Note = require('../models/note.db');
const User = require('../models/user.db');

const checkParentCategoryIsExists = async (req, res, next) => {
  const parentId = req.params.id || null;

  if (parentId) {
    const parentCategory = await Category.findById(parentId);

    if (!parentCategory) {
      next(new HttpError[404]("Parent category didn't found"));
    }
  }

  next();
};

const checkNotesIsExists = async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    next(new HttpError[404]("Note didn't found"));
  }

  next();
};

const isEmailExists = async (req, res, next) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    next(new HttpError[400]('Email already exists'));
  }
  next();
};

module.exports = {
  checkParentCategoryIsExists,
  checkNotesIsExists,
  isEmailExists
};
