import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  searchUsersService,
  updateUserService,
} from "../services/userService.js";


// =============> Create a new user <=============
export const createUser = async (req, res, next) => {
  try {
    const newUser = await createUserService(req.body, req.user);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

// =============> Search users by search query <=============
export const searchUsers = async (req, res, next) => {
  try {
    const data = await searchUsersService(req.query);

    res.status(200).json({ users: data });
  } catch (error) {
    next(error);
  }
};

// =============> Get all users <=============
export const getUsers = async (req, res, next) => {
  try {
    const users = await getUsersService();

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// =============> Get user by ID <=============
export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params);

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// =============> Update user by ID <=============
export const updateUserById = async (req, res, next) => {
  try {
    const updatedUser = await updateUserService(req.params, req.body, req.user);

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
    await deleteUserService(req.params, req.user);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
