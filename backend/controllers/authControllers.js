import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import {
  authenticateUserService,
  logoutUserService,
} from "../services/authService.js";
import {
  createSession,
  enforceSessionLimit,
} from "../services/sessionService.js";
import { cookieOptions } from "../utils/cookieOptions.js";
import { handleRefreshTokenService } from "../services/handleRefreshTokenService.js";
import { getClientIP } from "../utils/getClientIP.js";
import { getDeviceInfo } from "../utils/getDeviceInfo.js";

// =============> Login user and generate tokens <=============
export const login = async (req, res, next) => {
  try {
    const ip = getClientIP(req);
    const deviceInfo = getDeviceInfo(req);

    const user = await authenticateUserService(
      req.validatedData,
      ip,
      deviceInfo
    );

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // ===== limiting sessions =====
    await enforceSessionLimit(user._id);

    await createSession(user._id, refreshToken, req.headers["user-agent"]);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.json({
      accessToken,
      user: {
        id: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

// =============> Refresh access token using refresh token <=============
export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    // console.log(refreshToken, "Trying refresh...");

    const { newAccessToken, newRefreshToken, user } = await handleRefreshTokenService(
      refreshToken
    );

    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    console.log(newRefreshToken, "New access refresh token generated...");
    console.log(user, "User data from refresh token service...");
    
    
    res.json({ accessToken: newAccessToken, user: user });
  } catch (error) {
    next(error);
  }
};

// =============> Logout user by invalidating refresh token <=============
export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    await logoutUserService(token);

    res.clearCookie("refreshToken", cookieOptions);

    res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
