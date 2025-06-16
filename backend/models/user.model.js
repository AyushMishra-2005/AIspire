import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicURL: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp&s=128",
    },
    active: {
      type: Boolean,
      default: true,
    },
    verifyOtp: {
      type: String,
      default: ""
    },
    verifyOtpExpireAt: {
      type: Number,
      default: 0
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    resetOtp: {
      type: String,
      default: ""
    },
    resetOtpExpireAt: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;






















