const catchAsync = require("../utils/catchAsync");
const Service = require("../models/serviceModel");

exports.getAllService = catchAsync(async (req, res, next) => {
  const services = await Service.find();
  res.status(200).json({
    success: true,
    data: services,
  });
});

exports.createService = catchAsync(async (req, res, next) => {
  const service = await Service.create(req.body);
  res.status(201).json({
    success: true,
    data: service,
  });
});
