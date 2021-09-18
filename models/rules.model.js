const mongoose = require("mongoose");

const rulesSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Rule must have a content"],
      maxLength: [50, "Rule content should be below 50 characters"],
    },
    pinned: {
      type: Boolean,
      default: false,
      enum: {
        values: [true, false],
        message: "{VALUES} is not valid",
      },
    },
    RuleNumber: { type: Number },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Rules", rulesSchema);
