const express = require("express");
const authcontroller = require("../controllers/authController");
const serviceController = require("../controllers/serviceController");

const router = express.Router();

router
  .route("/")
  .get(authcontroller.protect, serviceController.getAllService)
  .post(
    authcontroller.protect,
    authcontroller.restrictTo("admin"),
    serviceController.createService
  );

module.exports = router;
