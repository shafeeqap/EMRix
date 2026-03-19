import { User } from "../models/User.js";

export const createUserRepo = async (data) => {
  return User.create(data);
};

export const findUserById = (id) => {
  return User.findById(id);
};
