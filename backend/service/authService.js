import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return user;
};
