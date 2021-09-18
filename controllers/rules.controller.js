const catchAsync = require("../utils/catchAsync");

const Rule = require("../models/rules.model");
const User = require("../models/user.model");

exports.addRules = catchAsync(async (req, res, next) => {
  const { content } = req.body;

  const rule = await Rule.create({
    content,
  });
  if (!rule) {
    throw Error("something wrong manual", 404);
  }

  const user = await User.findById(req.user._id);

  user.rules.push(rule._id);

  await user.save();

  res.status(201).json({ message: "New rule added", rule });
});

exports.updateRules = catchAsync(async (req, res, next) => {
  const { content } = req.body;

  const rule = await Rule.findById(req.params.id);
  rule.content = content;
  await rule.save();

  res.status(200).json({ message: "Rule updated", rule });
});

exports.deleteRules = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await Rule.deleteOne({ _id: id });

  const user = await User.findById(req.user.id).populate("rules");

  user.rules.remove(id);
  await user.save();

  res.status(200).json({ message: "Rule deleted", deleted: true });
});
