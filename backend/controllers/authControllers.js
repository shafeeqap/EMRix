import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import Session from "../models/Session.js";

// Login user and generate tokens
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const hashedToken = await bcrypt.hash(refreshToken, 10);

    // ===========> limiting sessions <===========
    const MAX_SESSIONS = 5;

    const sessions = await Session.find({ userId: user._id }).sort({
      createdAt: 1,
    });
    if (sessions.length >= MAX_SESSIONS) {
        const sessionsToDelete = sessions.slice(0, sessions.length - MAX_SESSIONS + 1
      );

      for (const session of sessionsToDelete) {
        await Session.deleteOne({ _id: session._id });
      }
    }

    await Session.create({
      userId: user._id,
      refreshToken: hashedToken,
      device: req.headers["user-agent"],
    });
    // user.refreshToken = hashedToken;
    // await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

      const sessions = await Session.find({ userId: decoded.id });

      let validSession = null;

      for (const session of sessions) {
        const isValid = await bcrypt.compare(
          refreshToken,
          session.refreshToken
        );

        if (isValid) {
          validSession = session;
          break;
        }
      }

      if (!validSession) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
      
      const user = await User.findById(decoded.id).select("+refreshToken");
      if (!user) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const newAccessToken = generateAccessToken(user);

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
        await Session.deleteOne({ _id: session._id });
        break;
      }
    }

    res.clearCookie("refreshToken");

    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
