import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

// =============> Create a new user <=============
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // validate input
    if (!name || !email || !password || !role) {
      res.status(400);
      throw new Error("All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

// =============> Get all users <=============
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// =============> Get user by ID <=============
export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// =============> Update user by ID <=============
export const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { name, email, password, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password, role },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// =============> Delete user by ID <=============
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
