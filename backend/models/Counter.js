import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true,
    },

    seq: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Counter = mongoose.model("Counter", counterSchema);
