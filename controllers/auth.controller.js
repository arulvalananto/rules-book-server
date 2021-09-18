const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const User = require("../models/user.model");

const sendToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  if (!token) {
    return next(AppError("Something wrong with token", 404));
  }

  return token;
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    email,
    password: hashPassword,
  });

  await user.save();

  const token = sendToken(user.id);

  res.status(200).json({ message: "Account created successfully", token });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(
      new AppError("Please enter valid email address or password", 401)
    );
  }

  const token = sendToken(user.id);

  res.status(200).json({ message: "LoggedIn Successfully", token });
});

exports.getCurrentUser = catchAsync(async (req, res) => {
  res.status(200).json({ message: "Success", user: req.user });
});
