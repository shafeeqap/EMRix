import { Counter } from "../models/Counter.js";

export const generatePatientID = async () => {
  const year = new Date().getFullYear();

  const counter = await Counter.findOneAndUpdate(
    { year },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true }
  );

  const padded = String(counter.seq).padStart(3, "0");

  return `PAT ${year}/${padded}`;
};
