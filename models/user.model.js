const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      maxLength: [25, "User name should not be above 25 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User must have an email address"],
      lowercase: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      select: false,
      minLength: [10, "Password length should be above 10 or more characters"],
    },
    rules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rules" }],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("Users", userSchema);
