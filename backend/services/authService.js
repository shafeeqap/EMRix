import Session from "../models/Session.js";
import { findAuthOne } from "../repositories/authRepository.js";
import { findSession } from "../repositories/sesseionRepository.js";
import { compareHash } from "../utils/hashUtils.js";
import { deleteSession } from "./sessionService.js";
import jwt from "jsonwebtoken";

// =============> Authenticate User Service <=============
export const authenticateUserService = async (body) => {
  const { email, password } = body;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await findAuthOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await compareHash(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

// =============> Logout User Service <=============
export const logoutUserService = async (token) => {
  if (!token) {
    throw new Error("No refresh token");
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  const sessions = await findSession({ userId: decoded.id });

  for (const session of sessions) {
    const isValid = await compareHash(token, session.refreshToken);

    if (isValid) {
      await deleteSession(session._id);
      break;
    }
  }
};
