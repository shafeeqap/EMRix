import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccesstoken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

// Login user and generate tokens
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log(req.body);
    
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccesstoken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;

    res.json({
      accessToken,
      refreshToken,
      user: { id: user._id, role: user.role, name: user.name },
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Refresh access token using refresh token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const newAccessToken = generateAccesstoken(user);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Logout user by invalidating refresh token
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const user = await User.findOne({ refreshToken }).select("+refreshToken");
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
