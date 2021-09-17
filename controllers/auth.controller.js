const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = User({
    name,
    email,
    password,
  });

  await user.save();

  const token = signToken(id);

  if (!token) {
    return next(AppError("Something wrong with token", 404));
  }

  res.status(200).json({ message: "success", token });
});

exports.login = (req, res, next) => {
  const { email, password } = req.body;
};
