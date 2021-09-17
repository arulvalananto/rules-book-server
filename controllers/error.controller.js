module.exports = (err, req, res, next) => {
  err.status = err.status || "fail";
  err.statusCode = err.statusCode || 500;

  let stack = undefined;
  if (process.env.NODE_ENV === "development") {
    stack = err.stack;
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack,
  });
};
