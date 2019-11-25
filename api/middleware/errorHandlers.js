const HttpError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;

const Category = require('../models/category.db');
const Note = require('../models/note.db');

const checkParentCategoryIsExists = async (req, res, next) => {
  const parentId = req.params.id || null;

  if (parentId) {
    const parentCategoryExists =
      ObjectId.isValid(parentId) && (await Category.findById(parentId));

    if (!parentCategoryExists) {
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

const catchAsyncErrors = fn => (req, res, next) =>
  fn(req, res, next).catch(next);

  /*
  Not Found Error Handler
  If we hit a route that wasn't found, we mark it as 404 and pass it along to the next error handler to display
*/
const routeNotFound = (req, res, next) => next(new HttpError[404]('Not Found! Wrong api endpoint'));

/*
  Development Error Handler
  Catch all errors in our controllers
  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, 
  we can show info on what happened
*/
const developmentErrors = (err, req, res, next) => {
  const { message, status, data } = err;
  err.stack = err.stack || '';
  // Formatting our error stack trace little bit
  const stackTraceFormatted = err.stack
    .split('\n')
    .map(i => i.replace(__dirname.split('/server')[0], '').trim())
    .slice(0, 5);

  // Send error response
  res
    .status(err.status || 500)
    .json({ message, status, data, stackTraceFormatted });
};

/*
  Production Error Handler
  No stacktraces are leaked to user
*/
const productionErrors = (err, req, res, next) => {
  const { message, status, data } = err;
  res.status(status || 500).json({ message, status, data });
};

module.exports = {
  checkParentCategoryIsExists,
  checkNotesIsExists,
  catchAsyncErrors,
  routeNotFound,
  developmentErrors,
  productionErrors
};
