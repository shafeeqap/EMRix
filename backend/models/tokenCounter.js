import mongoose from "mongoose";

const tokenCounterSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    seq: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

tokenCounterSchema.index({ doctorId: 1, date: 1 }, { unique: true });

export const TokenCounter = mongoose.model("TokenCounter", tokenCounterSchema);


