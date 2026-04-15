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
import { logAction } from "../utils/auditLogger.js";
import { hashValue } from "../utils/hashUtils.js";

// =============> Create user service <=============
export const createUserService = async (data, user) => {
  const { firstName, lastName, email, password, role } = data;

  console.log(data);

  // validate input
  if (!firstName || !lastName || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  const existingUser = await findUserOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await hashValue(password);

  const newUser = await createUserRepo({
    firstName,
    lastName,
    email,
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

  return newUser;
};

// =============> Get users service <=============
export const getUsersService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const skip = (page - 1) * limit;
  const search = query.search;
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

  const users = await findUsersBySearchQuery(searchQuery)
    // .sort({ firstName: 1, lastName: 1 })
    .limit(10);

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
    throw new Error("User not found");
  }

  return user;
};

// =============> Update user service <=============
export const updateUserService = async (params, data, user) => {
  const userId = params.id;

  const { firstName, lastName, email, password, role } = data;

  if (!firstName || !lastName || !email || !password || !role) {
    throw new Error("Missing required fields");
  }

  const userFound = await findUserById(userId);
  if (!userFound) {
    throw new Error("User not found");
  }

  const updatedUser = await findUserByIdAndUpdate(
    userId,
    { firstName, lastName, email, password, role },
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
        role: userFound.role,
      },
      updatedData: {
        firstName,
        lastName,
        email,
        role,
      },
    },
  });

  return updatedUser;
};

export const deleteUserService = async (params, user) => {
  const userId = params.id;

  const userFound = await findUserById(userId);
  if (!userFound) {
    throw new Error("User not found");
  }

  await findUserByIdAndDelete(userId);

  await logAction({
    userId: user.id,
    role: user.role,
    action: "DELETE_USER",
    entity: "User",
    entityId: userFound._id,
    metadata: {
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      role: userFound.department,
    },
  });
};
