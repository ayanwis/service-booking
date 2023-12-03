const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const Service = require("../models/serviceModel");
const AppError = require("../utils/appError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.bookService = catchAsync(async (req, res, next) => {
  const serviceId = req.body._id;

  const newBooking = await Booking.create({
    user: req.user._id,
    service: serviceId,
  });

  const lineItems = {
    price_data: {
      currency: "INR",
      product_data: {
        name: req.body.name,
      },
      unit_amount: req.body.price * 100,
    },
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [lineItems],
    customer_email: req.user.email,
    client_reference_id: newBooking._id,
    mode: "payment",
    success_url: "https://service-booking.netlify.app/success",
    cancel_url: "https://service-booking.netlify.app/cancel",
  });

  res.status(201).json({
    id: session.id,
  });
});

// UPDATE PAYMENT STATUS
const updatePaymentStatus = async (session) => {
  const bookingId = session.client_reference_id;
  const filter = { _id: bookingId };
  const update = { paymentStatus: true };

  await Booking.findOneAndUpdate(filter, update, { new: true });
};

// WEB HOOK FOR UPDATE PAYMENT STAUTS
exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed")
    updatePaymentStatus(event.data.object);

  res.status(200).json({ received: true });
};

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
