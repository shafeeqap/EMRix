import jwt from "jsonwebtoken";
import { findValidationSession, rotateRefreshToken } from "./sessionService.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { findAuthById } from "../repositories/authRepository.js";
import { AppError } from "../utils/AppError.js";

// =============> Handle refresh token service <=============
export const handleRefreshTokenService = async (refreshToken) => {
  // console.log(refreshToken, 'Refresh token in the handleRefrshTokenService...');

  if (!refreshToken) {
    throw new AppError("Refresh token required", 400);
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    // console.log(decoded, "Decoded refresh token...");
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  let validSession = await findValidationSession(decoded.id, refreshToken);
  if (!validSession) {
    throw new AppError("Invalid refresh token", 401);
  }

  const user = await findAuthById(decoded.id);
  if (!user) {
    throw new AppError("Invalid refresh token", 401);
  }

  // Token rotation
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  await rotateRefreshToken(validSession, newRefreshToken);

  return {
    newAccessToken,
    newRefreshToken,
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
    },
  };
};
