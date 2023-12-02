const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const jwtSign = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    // expiresIn: 100   //100s
  });

const createSendToken = (user, statusCode, res) => {
  // Create JWT token
  const token = jwtSign(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("token", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    if (!req.body)
      return res.status(400).json({
        success: false,
        message: "Please enter name, email, password",
      });

    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //CHECK IF USER IS ALREAY EXITS OR NOT
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser)
      return res.status(400).json({
        success: false,
        message: "You already have an accoutn try to login",
      });

    // ENCRYPT THE PASSWORD
    const encryptedPassword = await bcrypt.hash(password, 10);
    // CREATE A USER
    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  // GET ALL DATA FROM FRONTEND
  const { email, password } = req.body;

  // 1) Check email and password exists
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  // 2) Check user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  // 3) If email and password are valid then send token
  createSendToken(user, 200, res);
});
