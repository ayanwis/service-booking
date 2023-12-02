const AppError = require('../utils/appError')

const sendError = (err, req, res) => {
  // console.log(err)
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
  })
}

module.exports = (err, req, res, next) => {
  console.log('error')
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  sendError(err, req, res)
}
