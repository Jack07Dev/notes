const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
      maxlength: 250,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    
    // Forgot password OTP
    resetPasswordOtp: {
      type: String,
      default: null,
    },

    resetPasswordOtpExpires: {
      type: Date,
      default: null,
    },

    resetPasswordOtpAttempts: {
      type: Number,
      default: 0,
    },

    // Temporary token created after OTP verification
    passwordResetToken: {
      type: String,
      default: null,
    },

    passwordResetTokenExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
