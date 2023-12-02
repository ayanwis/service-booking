const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErroHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoute");
const serviceRouter = require("./routes/serviceRoute");
const bookingRouter = require("./routes/bookingRoute");

const app = express();
const corsOptions = {
  origin: [
    // URL er last e kokhon o '/' debe na
    "http://localhost:5173",
  ],
  credentials: true, // Allow credentials (cookies)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// 2) ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/bookings", bookingRouter);

app.use(globalErroHandler);
module.exports = app;
