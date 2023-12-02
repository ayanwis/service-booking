const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const Service = require("../models/serviceModel");
const AppError = require("../utils/appError");

exports.bookService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.body.service);
  if (!service) return next(new AppError("No service found", 404));
  console.log(service);

  const newBooking = await Booking.create({ user: req.user, service: service });
  res.status(201).json({
    success: true,
    message: "Serviced booked succuessfully",
    data: newBooking,
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();
  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.getUserBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user });
  res.status(200).json({
    success: true,
    bookings,
  });
});
