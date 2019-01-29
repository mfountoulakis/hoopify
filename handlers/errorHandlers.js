exports.catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/*
    Not Found Error Handler
    If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
  */
exports.notFound = (req, res, next) => {
  const err = new Error('Route Not Found 💩');
  err.status = 404;
  next(err);
};
