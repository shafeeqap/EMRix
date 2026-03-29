import jwt from "jsonwebtoken";
import { findValidationSession, rotateRefreshToken } from "./sessionService.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { findAuthById } from "../repositories/authRepository.js";

// =============> Handle refresh token service <=============
export const handleRefreshTokenService = async (refreshToken) => {
  console.log(refreshToken, 'Refresh token in the handleRefrshTokenService...');
  
  if (!refreshToken) {
    throw new Error("Refresh token required");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }

  let validSession = await findValidationSession(decoded.id, refreshToken);
  if (!validSession) {
    throw new Error("Invalid refresh token");
  }

  const user = await findAuthById(decoded.id);
  if (!user) {
    throw new Error("Invalid refresh token");
  }

  // Token rotation
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  await rotateRefreshToken(validSession, newRefreshToken);

  return { newAccessToken, newRefreshToken };
};
