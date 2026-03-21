import { User } from "../models/User.js";

export const createUserRepo = async (data) => {
  return User.create(data);
};

export const findUserById = (id) => {
  return User.findById(id);
};

export const findUserOne = async (filter) => {
  return User.findOne(filter);
};

export const findUsers = async () => {
  return User.find();
};

export const findUserByIdAndUpdate = async (id, updates, option) => {
  return User.findByIdAndUpdate(id, updates, option);
};

export const findUserByIdAndDelete = async (id) => {
  return User.findByIdAndDelete(id);
};
