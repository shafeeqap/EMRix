import { findDoctorOne } from "../repositories/doctorRepository.js";
import {
  countUserDocuments,
  createUserRepo,
  findUserById,
  findUserByIdAndDelete,
  findUserByIdAndUpdate,
  findUserOne,
  findUsers,
  findUsersBySearchQuery,
} from "../repositories/userRepository.js";
import { AppError } from "../utils/AppError.js";
import { logAction } from "../utils/auditLogger.js";
import { hashValue } from "../utils/hashUtils.js";

// =============> Create user service <=============
export const createUserService = async (data, user) => {
  const { firstName, lastName, email, mobile, password, role } = data;

  // validate input
  if (!firstName || !lastName || !email || !mobile || !password || !role) {
    throw new AppError("All fields are required", 400);
  }

  const existingUser = await findUserOne({ email });

  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  const hashedPassword = await hashValue(password);

  const newUser = await createUserRepo({
    firstName,
    lastName,
    email,
    mobile,
    password: hashedPassword,
    role,
  });

  await logAction({
    userId: user.id,
    role: user.role,
    action: "CREATE_USER",
    entity: "User",
    entityId: newUser._id,
    metadata: {
      userId: newUser._id,
      firstName,
      lastName,
      role,
    },
  });

  const userData = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    mobile: newUser.mobile,
    role: newUser.role,
  };

  return userData;
};

// =============> Get users service <=============
export const getUsersService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const skip = (page - 1) * limit;
  const search = query.search?.trim();
  const status = query.status;

  const filter = {};

  if (search) {
    filter.$or = [
      { firstName: { $regex: `^${search}`, $options: "i" } },
      { lastName: { $regex: `^${search}`, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
    ];
  }

  if (status === "active") {
    filter.isActive = true;
  } else if (status === "inactive") {
    filter.isActive = false;
  }

  const total = await countUserDocuments(filter);
  const users = await findUsers(filter, skip, limit);

  const totalPages = Math.ceil(total / limit);

  return { users, page, totalPages };
};

// =============> Search users service <=============
export const searchUsersService = async (query) => {
  const { search } = query;

  if (!search) {
    throw new AppError("Search query is required", 400);
  }

  const searchQuery = search
    ? {
        $or: [
          { firstName: { $regex: `^${search}`, $options: "i" } },
          { lastName: { $regex: `^${search}`, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const users = await findUsersBySearchQuery(searchQuery);
  
  const data = users.map((user) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    mobile: user.mobile,
  }));

  return data;
};

// =============> Get user by ID service <=============
export const getUserByIdService = async (params) => {
  const userId = params.id;

  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// =============> Update user service <=============
export const updateUserService = async (params, data, user) => {
  const userId = params.id;

  const { firstName, lastName, email, mobile, role } = data;

  if (!firstName || !lastName || !email || !mobile || !role) {
    throw new AppError("Missing required fields", 400);
  }

  const userFound = await findUserById(userId);
  if (!userFound) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = await findUserByIdAndUpdate(
    userId,
    { firstName, lastName, email, mobile, role },
    { returnDocument: "after" }
  );

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_USER",
    entity: "User",
    entityId: userFound._id,
    metadata: {
      userId: userFound._id,
      previousData: {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        mobile: userFound.mobile,
        role: userFound.role,
      },
      updatedData: {
        firstName,
        lastName,
        email,
        mobile,
        role,
      },
    },
  });

  return updatedUser;
};

// =============> Update user status service <=============
export const updateUserStatusService = async (params, data, user) => {
  const id = params.id;
  const { status } = data;

  const userData = await findUserById(id);

  if (!userData) {
    throw new AppError("User not found", 404);
  }

  userData.isActive = status;
  await userData.save();

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_USER_STATUS",
    entity: "User",
    entityId: user._id,
    metadata: {
      oldStatus: status,
      newStatus: user.isActive,
    },
  });

  return user;
};

// =============> Delete user service <=============
export const deleteUserService = async (params, user) => {
  const userId = params.id;

  const doctor = await findDoctorOne({ userId });

  if (doctor) {
    throw new AppError("User exist as a doctor, cannot delete", 409);
  }

  const deletedUser = await findUserByIdAndDelete(userId);

  if (!deletedUser) {
    throw new AppError("User not found", 404);
  }
  await logAction({
    userId: user.id,
    role: user.role,
    action: "DELETE_USER",
    entity: "User",
    entityId: deletedUser._id,
    metadata: {
      firstName: deletedUser.firstName,
      lastName: deletedUser.lastName,
      role: deletedUser.department,
    },
  });
};
