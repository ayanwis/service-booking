const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    // CREATE A TOKEN
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    newUser.token = token;
    newUser.password = undefined;

    return res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    // GET ALL DATA FROM FRONTEND
    const { email, password } = req.body;
    // VALIDATION
    if (!(email && password))
      return res
        .status(400)
        .json({ status: false, message: "Please enter email & password" });
    // FIND USER IN DB
    const user = await User.findOne({ email });
    // IF USER IS NOT THERE
    // MATCH THE PASSWORD
    if (!user && (await bcrypt.compare(password, user.password)))
      return res.status(404).json({
        success: false,
        message: "Not user found with the following credential",
      });

    // SEND A TOKEN
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    user.token = token;
    // user.password = undefined;

    // SEND TOKEN IN COOKIE
    const option = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, option).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
