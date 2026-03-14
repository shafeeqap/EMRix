import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

// Login user and generate tokens
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select(
      "+password +refreshToken"
    );
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
    user.refreshToken = hashedToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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

      const user = await User.findById(decoded.id).select("+refreshToken");
      if (!user) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isValid) {
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
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.user.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie("refreshToken");

    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
