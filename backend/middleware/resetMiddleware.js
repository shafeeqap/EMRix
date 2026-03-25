import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const verifyResetToken = async (req, res, next) => {
  try {
    const token = req.cookies.resetToken;

    if (!token) {
      throw new Error("No token");
    }

    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);

    if (decoded.type !== "reset") {
      throw new Error("Invalid token type");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
