const express = require("express");
const authController = require("../controllers/authController");
const bookingCrontroller = require("../controllers/bookingController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, bookingCrontroller.bookService)
  .get(authController.protect, bookingCrontroller.getUserBookings);

router
  .route("/admin")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    bookingCrontroller.getAllBookings
  );

module.exports = router;
