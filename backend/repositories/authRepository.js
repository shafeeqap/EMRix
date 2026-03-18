import { User } from "../models/User.js";

export const findAuthOne = (credentials) => {
  return User.findOne(credentials);
};

export const findAuthById = async (id) => {
  return User.findById(id);
};
