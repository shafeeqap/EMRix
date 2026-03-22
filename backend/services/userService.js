import {
  createUserRepo,
  findUserById,
  findUserByIdAndDelete,
  findUserByIdAndUpdate,
  findUserOne,
  findUsers,
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
export const getUsersService = async () => {
  const users = await findUsers();
  return users;
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
    { returnDocument: 'after' }
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
