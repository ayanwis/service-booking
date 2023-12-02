const AppError = require("../utils/appError");

const handeCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handelDuplicateFieldsErrorDB = (err) => {
  const message = `Duplicate ${Object.keys(err.keyValue)}: ${Object.values(
    err.keyValue
  )}`;
  return new AppError(message, 400);
};

const handelValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handelJWTError = () => {
  const message = "Invalid token! Please log in again";
  return new AppError(message, 401);
};

const handelJWTExpiredError = () => {
  const message = "Your token has expired! Please log in again";
  return new AppError(message, 401);
};

// Send error via response
const sendErrorMessage = (res, statusCode, status, message) => {
  res.status(statusCode).json({
    status,
    message,
  });
};

// Show rendered error in web page
const renderErrorMessage = (res, status, title, msg) => {
  res.status(status).render("error", {
    title,
    msg,
  });
};

const sendErrorDev = (err, req, res) => {
  console.log(err);
  if (req.originalUrl.startsWith("/api")) {
    // 1) API
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      // stack: err.stack
    });
  }
  // 2) Rendered Website
  // console.error(err);
  return renderErrorMessage(
    res,
    err.statusCode,
    "Something went wrong!",
    err.message
  );
};

const sendErrorProd = (err, req, res) => {
  // 1) API
  if (req.originalUrl.startsWith("/api")) {
    // Operational, trusted error: send message to client
    if (err.isOperational)
      return sendErrorMessage(res, err.statusCode, err.status, err.message);

    // Programming or other unknown error: don,t show error details
    // Send generic message
    console.error(err);
    return sendErrorMessage(res, 500, "error", "Something went wrong");
  }

  // 2) Rendered website
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return renderErrorMessage(
      res,
      err.statusCode,
      "Something went wrong!",
      err.message
    );
  }

  // Programming or other unknown error: don,t show error details
  // Send generic message
  console.error(err);
  return renderErrorMessage(
    res,
    500,
    "Something went wrong!",
    "Please try again later!"
  );
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.kind === "ObjectId") error = handeCastErrorDB(error);
    if (error.code === 11000) error = handelDuplicateFieldsErrorDB(error);
    if (error.errors) error = handelValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handelJWTError();
    if (error.name === "TokenExpiredError") error = handelJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};
