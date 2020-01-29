module.exports = function(req, res, next) {
  if (!req.session.isAuthenticated) {
    res.json({ auth: false });
  }

  next();
};
