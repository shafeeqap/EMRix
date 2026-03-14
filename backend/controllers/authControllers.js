import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import Session from "../models/Session.js";
import { authenticateUser } from "../service/authService.js";
import {
  createSession,
  deleteSession,
  enforceSessionLimit,
  findValidationSession,
  rotateRefreshToken,
} from "../service/sessionService.js";
import { cookieOptions } from "../utils/cookieOptions.js";

// Login user and generate tokens
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await authenticateUser(email, password);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // ===========> limiting sessions <===========
    await enforceSessionLimit(user._id);

    await createSession(user._id, refreshToken, req.headers["user-agent"]);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.json({
      accessToken,
      user: { id: user._id, role: user.role, name: user.name },
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Refresh access token using refresh token
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      let validSession = await findValidationSession(decoded.id, refreshToken);

      if (!validSession) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const user = await User.findById(decoded.id).select("+refreshToken");
      if (!user) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      // ===========> refresh token rotation <===========
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      await rotateRefreshToken(validSession, newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, cookieOptions);

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout user by invalidating refresh token
export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const sessions = await Session.find({ userId: decoded.id });

    for (const session of sessions) {
      const isValid = await bcrypt.compare(token, session.refreshToken);

      if (isValid) {
        await deleteSession(session._id);
        break;
      }
    }

    res.clearCookie("refreshToken", cookieOptions);

    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
