import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["super_admin", "doctor", "receptionist"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // refreshToken: {
    //   type: String,
    //   select: false, // Don't return refresh token by default
    // },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
