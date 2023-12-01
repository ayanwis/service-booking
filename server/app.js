const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// 2) ROUTES
app.use("/api/v1/user", userRouter);

module.exports = app;
